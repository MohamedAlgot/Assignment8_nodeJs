import { Router } from "express";
import {
  aggregateBooksAfterYear,
  aggregateBooksAfterYear2,
  aggregateGenres,
  aggregateJoinBooksWithLogs,
  creatBooks,
  deleteBooksBeforeYear,
  findbooks,
  findBooksByYearRange,
  findYearIntger,
  getBooks,
  getBooksExcludeGenres,
  inserManybooks,
  modelbooks,
  updatBooks,
} from "./book.service.js";

const router = Router();

router.post("/collection/books", async (req, res, next) => {
  try {
    modelbooks();
    const result = await creatBooks(req.body);
    res.status(200).json({ ok: 1, data: { result } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/collection/books/batch", async (req, res, next) => {
  try {
    const books = req.body;
    if (!Array.isArray(books) || books <= 3)
      throw new Error("Please provide an array of at least three books", {
        cause: 409,
      });
    const result = await inserManybooks(books);
    res.status(200).json({ ok: 1, data: { result } });
  } catch (error) {
    res.status(error.cause || 500).json({ message: error.message });
  }
});

router.patch("/books/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const newdata = req.body;
    const find = await findbooks(title);
    if (!find) throw new Error("books not found", { cause: 409 });
    const update = await updatBooks({ title }, newdata);
    res.status(200).json({ message: "updated successfully", isUpdate: update });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});
router.get("/books/title", async (req, res) => {
  try {
    const { title } = req.query;
    const book = await getBooks({ title });
    if (!book) throw new Error("book not found this the title", { cause: 409 });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/books/year", async (req, res) => {
  try {
    let { from, to } = req.query;
    from = Number(from);
    to = Number(to);
    const book = await findBooksByYearRange(from, to);
    if (!book.length) throw new Error("book not found ", { cause: 409 });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/books/year-integer", async (req, res) => {
  try {
    const book = await findYearIntger();
    if (!book.length)
      throw new Error("book not found  is integer", { cause: 409 });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});
export default router;

router.get("/books/exclude-genres", async (req, res) => {
  try {
    const books = await getBooksExcludeGenres();

    if (!books.length)
      return res.status(404).json({ message: "No books found" });

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/books/before-year", async (req, res) => {
  try {
    const year = Number(req.query.year);
    const result = await deleteBooksBeforeYear(year);
    if (!result.deletedCount) throw new Error("No book found", { cause: 409 });
    res.status(200).json({ message: "deleted successfully", data: result });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});
router.get("/books/aggregate1", async (req, res) => {
  try {
    const year = Number(req.query.year);
    const result = await aggregateBooksAfterYear(year);
    if (!result.length) throw new Error("No book found", { cause: 409 });
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/books/aggregate2", async (req, res) => {
  try {
    const year = Number(req.query.year);
    const result = await aggregateBooksAfterYear2(year);
    if (!result.length) throw new Error("No book found", { cause: 409 });
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/books/aggregate3", async (req, res) => {
  try {
    const result = await aggregateGenres();

    if (!result.length)
      return res.status(404).json({ message: "No data found" });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/books/aggregate4", async (req, res) => {
  try {
    const result = await aggregateJoinBooksWithLogs();

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});