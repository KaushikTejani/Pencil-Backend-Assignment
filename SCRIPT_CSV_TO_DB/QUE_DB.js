const csv = require('csvtojson')
const questionModel = require("../models/questionModel");
const TopicModel = require("../models/topicModel");
const mongoose = require('mongoose')


async function main() {
    await mongoose.connect('mongodb+srv://Kaushik:Kaushik@cluster0.rpenozr.mongodb.net/Pencil?retryWrites=true&w=majority');

    const topicsJSON = await csv().fromFile("./quetions.csv");
    for (const topic of topicsJSON) {
        const queNo = topic["0"];
        const annotation1 = String(topic["1"]).trim().toLowerCase();
        const annotation2 = String(topic["2"]).trim().toLowerCase();
        const annotation3 = String(topic["3"]).trim().toLowerCase();
        const annotation4 = String(topic["4"]).trim().toLowerCase();
        const annotation5 = String(topic["5"]).trim().toLowerCase();

        let annotation1DB, annotation2DB, annotation3DB, annotation4DB, annotation5DB;
        let annotationArray = [];

        if (annotation1 != "") {
            const annotation1DB = await TopicModel.findOne({ topic: annotation1 }, { _id: 1 });
            if (annotation1DB)
                annotationArray.push(mongoose.Types.ObjectId(annotation1DB._id))
        }


        if (annotation2 != "") {
            const annotation2DB = await TopicModel.findOne({ topic: annotation2 }, { _id: 1 });
            if (annotation2DB)
                annotationArray.push(mongoose.Types.ObjectId(annotation2DB._id))
        }


        if (annotation3 != "") {
            const annotation3DB = await TopicModel.findOne({ topic: annotation3 }, { _id: 1 });
            if (annotation3DB)
                annotationArray.push(mongoose.Types.ObjectId(annotation3DB._id))
        }


        if (annotation4 != "") {
            const annotation4DB = await TopicModel.findOne({ topic: annotation4 }, { _id: 1 });
            if (annotation4DB)
                annotationArray.push(mongoose.Types.ObjectId(annotation4DB._id))
        }


        if (annotation5 != "") {
            const annotation5DB = await TopicModel.findOne({ topic: annotation5 }, { _id: 1 });
            if (annotation5DB)
                annotationArray.push(mongoose.Types.ObjectId(annotation5DB._id))
        }

        const quetionCreate = await new questionModel({
            question: parseInt(queNo),
            annotation: annotationArray
        }).save();

        if(quetionCreate)
            console.log(`Quetion no ${quetionCreate.question} is created.`);

    }

    console.log("Done");
}

main();
/* 
mongoose.connect('mongodb+srv://Kaushik:Kaushik@cluster0.rpenozr.mongodb.net/pencil2?retryWrites=true&w=majority', (err) => {
    if (err)
        console.log(err);
    else
        console.log("DB Connected");


    const TopicModel = require("./models/topicModel");

    csv()
        .fromFile("./topic.csv")
        .then(async (jsonObj) => {
            for (const topic of jsonObj) {
                const topic3 = String(topic["3"]).trim();
                const topic2 = String(topic["2"]).trim();
                const topic1 = String(topic["1"]).trim();
                console.log(topic3, topic2, topic1);

                if (topic3 != "") {


                    let isTopic3Present = await TopicModel.findOne({ topic: topic3 });

                    if (!isTopic3Present) {
                        console.log("demo2");
                        isTopic3Present = await new TopicModel({
                            topic: topic3
                        }).save();
                        console.log(isTopic3Present._id);
                    }

                    let isTopic2Present = await TopicModel.findOne({ topic: topic2 });

                    if (!isTopic2Present) {
                        isTopic2Present = await new TopicModel({
                            topic: topic3,
                            children: [isTopic3Present._id]
                        }).save();
                    } else {
                        isTopic2Present["children"] = isTopic2Present.children.push(isTopic3Present._id);
                        isTopic2Present = isTopic2Present.save();
                    }



                    let isTopic1Present = await TopicModel.findOne({ topic: topic1 });

                    if (!isTopic1Present) {
                        isTopic1Present = await new TopicModel({
                            topic: topic1,
                            children: [isTopic2Present._id]
                        }).save();
                    } else {
                        isTopic1Present["children"] = isTopic1Present.children.push(isTopic2Present._id);
                        isTopic1Present = isTopic1Present.save();
                    }
                } else {
                    let isTopic2Present = await TopicModel.findOne({ topic: topic2 });

                    if (!isTopic2Present) {
                        isTopic2Present = await new TopicModel({
                            topic: topic3,
                        }).save();
                    }

                    let isTopic1Present = await TopicModel.findOne({ topic: topic1 });

                    if (!isTopic1Present) {
                        isTopic1Present = await new TopicModel({
                            topic: topic1,
                            children: [isTopic2Present._id]
                        }).save();
                    } else {
                        isTopic1Present["children"] = isTopic1Present.children.push(isTopic2Present._id);
                        isTopic1Present = isTopic1Present.save();
                    }
                }
            }
        })
});
 */