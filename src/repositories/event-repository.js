const { ObjectId } = require('mongodb');

async function createEventDocument (collection, data) {

    const eventDocument = {
            type: "event",
            image: data.image,
            name: data.name,
            tagline: data.tagline,
            schedule: data.schedule,
            description: data.description,
            moderator: data.moderator,
            category: data.category,
            sub_category: data.sub_category,
            rigor_rank: data.rigor_rank,
            attendees: data.attendees
    };

    const eventId = await collection.insertOne(eventDocument);

    return eventId.insertedId;
}


async function getAllEvents(collection, events) {
    if(events.type === "latest") {
        const data = await collection.find()
                                    .sort({schedule: -1})
                                    .limit(events.limit)
                                    .toArray();
        return data;
    }
}

async function updateEvent(collection, eventId, data) {

    const oldEventDocument = await collection.findOne({_id: new ObjectId(eventId)});

    const newEventDocument = {
        type: "event",
        image: data.image || oldEventDocument.image,
        name: data.name || oldEventDocument.name,
        tagline: data.tagline || oldEventDocument.tagline,
        schedule: data.schedule || oldEventDocument.schedule,
        description: data.description || oldEventDocument.description,
        moderator: data.moderator || oldEventDocument.moderator,
        category: data.category || oldEventDocument.category,
        sub_category: data.sub_category || oldEventDocument.sub_category,
        rigor_rank: data.rigor_rank || oldEventDocument.rigor_rank,
        attendees: data.attendees || oldEventDocument.attendees
    }

    const res = await collection.updateOne({_id: new ObjectId(eventId)}, { $set: newEventDocument});
    return res.insertedId;
}


async function findEventById(collection, eventId) {
    const data = await collection.findOne({_id: new ObjectId(eventId)});
    return data;
}


async function deleteEventById(collection, eventId) {
    const data = collection.deleteOne({_id: new ObjectId(eventId)});
    return data;
}

module.exports = {
    updateEvent,
    getAllEvents,
    findEventById,
    deleteEventById,
    createEventDocument,
}