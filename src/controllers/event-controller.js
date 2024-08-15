const MongoClient = require('mongodb').MongoClient;

const { createEventDocument, findEventById, deleteEventById, getAllEvents, updateEvent } = require('../repositories/event-repository');

require('dotenv').config();
const client = new MongoClient(process.env.DB_URI);

const create = async (req, res, next) => {

    try {
        await client.connect();

        const collection = await client.db('Nudge').collection('events');
        const response = await createEventDocument(collection, req.body);

        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created a event",
            err: {}
        });

    } catch (error) {
        console.error('Failed to create a event!', error);

        return res.status(500).json({
            data: {}, 
            success: false,
            message: "Cannot create new a event",
            err: error
        });
    }
}

const find = async (req, res, async) => {

    const eventId = req.query.id;

    try {
        
        await client.connect();

        const collection = await client.db('Nudge').collection('events');
        const response = await findEventById(collection, eventId);

        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully fetched a event",
            err: {}
        });

    } catch (error) {
        console.error('Failed to fetch a event!', error);

        return res.status(500).json({
            data: {}, 
            success: false,
            message: "Not able to get a event",
            err: error
        });
    }

}

const getAll = async (req, res, async) => {

    const type = req.query.type;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);

    try {
        
        await client.connect();

        const collection = await client.db('Nudge').collection('events');
        const response = await getAllEvents(collection, {type, limit, page});

        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully fetched events",
            err: {}
        });

    } catch (error) {
        console.error('Failed to fetch events!', error);

        return res.status(500).json({
            data: {}, 
            success: false,
            message: "Not able to get events",
            err: error
        });
    }

}

const update = async (req, res, async) => {

    const eventId = req.params.id;

    try {
        
        await client.connect();

        const collection = await client.db('Nudge').collection('events');
        const response = await updateEvent(collection, eventId, req.body);

        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully updated event",
            err: {}
        });

    } catch (error) {
        console.error('Failed to update event!', error);

        return res.status(500).json({
            data: {}, 
            success: false,
            message: "Not able to update event",
            err: error
        });
    }

}

const destroy = async (req, res, async) => {

    const eventId = req.params.id;

    try {
        
        await client.connect();

        const collection = await client.db('Nudge').collection('events');
        const response = await deleteEventById(collection, eventId);

        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted a event",
            err: {}
        });

    } catch (error) {
        console.error('Failed to create a new event!', error);

        return res.status(500).json({
            data: {}, 
            success: false,
            message: "Not able to delete a event",
            err: error
        });
    }

}

module.exports = {
    find,
    create,
    getAll,
    update,
    destroy,
}