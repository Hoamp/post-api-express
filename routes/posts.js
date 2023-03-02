const express = require("express");
//tambahkan baris kode ini untuk import models
const models = require("../models/index");

const router = express.Router();

/**
 * Route untuk mengambil semua data artikel
 */
router.get("/", async function (req, res, next) {
    try {
        // ambil semua data
        let posts = await models.posts.findAll({});

        // jika ada posts
        if (posts.length !== 0) {
            res.json({
                status: "ok",
                message: "All data posts",
                data: posts,
            });
        } else {
            // jika data dalam database kosong
            res.json({
                status: "ok",
                message: "Data posts kosong",
                data: {},
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "ERROR",
            message: "internal server error",
        });
    }
});

/**
 * Route untuk mengambil artikel berdasarkan ID
 */
router.get("/:id", async function (req, res, next) {
    try {
        // ambil id
        let id = req.params.id;
        let post = await models.posts.findByPk(id);

        if (post) {
            res.json({
                status: "ok",
                message: "post found",
                data: post,
            });
        } else {
            res.json({
                status: "ok",
                message: "post not found",
                data: {},
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "ERROR",
            message: "cant find post by id, Internal error",
        });
    }
});

/**
 * Route untuk membuat artikel baru
 */
router.post("/", async function (req, res, next) {
    try {
        // ambil inputan
        let { title, content, tags, published } = req.body;

        let post = await models.posts.create({
            title,
            content,
            tags,
            published,
        });

        // kirim response
        if (post) {
            res.status(201).json({
                status: "ok",
                message: "Successfully insert data post",
                data: post,
            });
        }
    } catch (error) {
        res.status(501).json({
            status: "ERROR",
            message: error.message,
        });
    }
});

/**
 * Route untuk mengupdate artikel berdasarkan ID
 */
router.put("/:id", async function (req, res, next) {
    try {
        // ambil id yang akan diubah
        let id = req.params.id;

        // apa yang akan diubah
        let { title, content, tags, published } = req.body;

        // ubah post
        let post = await models.posts.update(
            {
                title,
                content,
                tags,
                published,
            },
            {
                where: {
                    // berdasarkan id
                    id: id,
                },
            }
        );

        // jika data berhasil diubah
        if (post) {
            // kembalikan response
            res.json({
                status: "ok",
                message: "Data updated successfully",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "ERROR",
            message: err.message,
        });
    }
});

/**
 * Route untuk menghapus artikel berdasarkan ID
 */
router.delete("/:id", async function (req, res, next) {
    try {
        // ambil id yang akan dihapus
        let id = req.params.id;

        // hapus postingan
        let post = models.posts.destroy({
            where: {
                // hapus berdasarkan id
                id: id,
            },
        });

        // jika berhasil
        if (post) {
            res.json({
                status: "ok",
                message: "Data post deleted successfully",
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "ERROR",
            message: "internal error",
        });
    }
});

module.exports = router;
