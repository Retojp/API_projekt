const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *  schemas:
 *      Game:
 *          type: object
 *          required:
 *              - name
 *              - price
 *              - genre
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id.
 *              name:
 *                  type: string
 *                  description: Name of the game.
 *              price:
 *                  type: string
 *                  description: Price of the game.
 *              genre:
 *                  type: string
 *                  description: Genre of the game.
 *          example:
 *              name: Gothic III
 *              price: 89.99
 *              genre: RPG
 */

/**
 * @swagger
 * tags:
 *  name: Games
 *  description: Games API
 */


/**
 * @swagger
 * /games:
 *  get:
 *      summary: Request list of all games.
 *      tags: [Games]
 *      responses:
 *          200:
 *              description: List of all games.
 *          
 */
router.get('/', async (req,res)=>{
    try {
        const games = await Game.find()
        res.json(games)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: The game id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: The game was not found
 */
router.get('/:id', getGame, (req,res)=>{
    res.send(res.game)
})
/**
 * @swagger
 * /games:
 *  post:
 *      summary: Create a new game.
 *      tags: [Games]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Game'
 *      responses:
 *          201:
 *              description: Game was created.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Game'
 *          500:
 *              description: Internal error.
 * 
 */
router.post('/', async (req,res)=>{
    const game = new Game({
        name: req.body.name,
        price: req.body.price,
        genre: req.body.genre
    })
    try{
        const newGame = await game.save()
        res.status(201).json(newGame)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

/**
 * @swagger
 * /games/{id}:
 *  patch:
 *     summary: Update game by id.
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: The game id.
 *     requestBody:
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/Game'
 *     responses:
 *         201:
 *             description: Game was updated.
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/Game' 
 *         404:
 *             description: The game was not found.
 *         500:
 *             description: Internal error.
 */

router.patch('/:id', getGame, async (req,res)=>{
    if(req.body.name != null){
        res.game.name = req.body.name
    }
    if(req.body.price != null){
        res.game.price = req.body.price
    }
    if(req.body.genre != null){
        res.game.genre = req.body.genre
    }

    try{
        const updatedGame = await res.game.save()
        res.status(201).json(updatedGame)
    } catch(err){
        res.status(400).json({message:err.message})
    }
})
/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Update the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: Game deleted.
 *       404:
 *         description: The game was not found.
 */
router.delete('/:id', getGame, async (req,res)=>{
    try{
        await res.game.remove()
        res.status(200).json({message: "Game deleted"})
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getGame(req,res,next) {
    let game
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message: "Cannot find game"})
        }
        game = await Game.findById( req.params.id)
        if(game == null){
            return res.status(404).json({message: "Cannot find game"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.game = game
    next()
}

module.exports = router