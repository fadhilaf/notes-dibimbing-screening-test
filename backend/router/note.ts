import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { customAlphabet, urlAlphabet } from "nanoid";

import sequelize from "../config/db";
import Note from "../model/note";
import { isValidDateFormat } from "../util/validDateFormat";
import validateRequest from "../middleware/validateRequest";

const nanoid = customAlphabet(urlAlphabet.replace("-", ""), 12)
const noteRouter = Router()

//Get all notes
noteRouter.get(
  "", 
  async (req: Request, res: Response) => {
    let page = 1

    if (typeof req.query.page === 'string') {
      page = parseInt(req.query.page, 10)
    }

    try {
      const notes = await Note.findAll({
        attributes: [
          'id',
          'title',
          'createdAt',
          //optimizing query, only the first 20 character took
          [sequelize.fn('SUBSTRING', sequelize.col('body'), 1, 50), 'body']
        ],

        //optimizing query, only limit 10 per page
        offset: (page - 1) * 5,
        limit: 5,
        order: [
          ['createdAt', 'DESC'],
        ]
      })

      return res.status(200).json(notes)

    } catch(error) {
      console.log(error)

      return res.status(500).send()
    }
})

//Get note by id
noteRouter.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const note = await Note.findByPk(req.params.id)
    
      if (!note) {
        return res.status(400).send("Invalid note id")
      }

      return res.status(200).json(note)

    } catch(error) {
      console.log(error)

      return res.status(500).send()
    }
  }
)

//Create note
noteRouter.post(
  "", 
  [
    body("title").notEmpty().isString().withMessage("'title' is required"),
    body("body").notEmpty().isString().withMessage("'body' is required"),
    validateRequest
  ], 
  async (req: Request, res: Response) => {
    const {title, body} = req.body;

    try {
      const note = await Note.create({id: nanoid(), title, body})

      return res.status(201).json(note)

    } catch(error) {
      console.log(error)

      return res.status(500).send()
    }
})

//Update note
noteRouter.put(
  "/:id",
  [
    body("title").notEmpty().isString().withMessage("'title' is required"),
    body("body").notEmpty().isString().withMessage("'body' is required"),
    body("createdAt").notEmpty().custom(isValidDateFormat).withMessage("'createdAt' is required and type should be date format YYYY-MM-DDTHH:mm:ss.SSSZ").toDate(),
    validateRequest
  ],
  async (req: Request, res: Response) => {
    try {
      const note = await Note.findByPk(req.params.id)

      if (!note) {
        return res.status(400).send("Invalid note id")
      }

      const [_, [updatedNote]] = await Note.update({
        title: req.body.title,
        body: req.body.body,
        createdAt: req.body.createdAt || note.createdAt
      }, {
        where: {
          id: req.params.id
        },
        returning: true,
      })

      return res.status(200).json(updatedNote)

    } catch(error) {
      console.log(error)

      return res.status(500).send()
    }
})

//Delete note
noteRouter.delete(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const note = await Note.findByPk(req.params.id)

      if (!note) {
        return res.status(400).send("Invalid note id")
      }

      await Note.destroy({
        where: {
          id: req.params.id
        }
      })

      return res.status(204).send()

    } catch(error) {
      console.log(error)

      return res.status(500).send()
    }
  }
)

export default noteRouter;
