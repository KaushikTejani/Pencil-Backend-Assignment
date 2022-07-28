const express = require("express");
const router = express.Router();
const questionModel = require("../../../models/questionModel");
const TopicModel = require("../../../models/topicModel");


router.get("/", async (req, res) => {
    const query = String(req.query.q).trim().toLowerCase();

    if (query) {
        const getTopicData = await TopicModel.findOne({ topic: query });
        if (getTopicData) {
            const childNode = getTopicData.children;            
            const quetions = await questionModel.aggregate([{
                $match: {
                    annotation: {
                        $in: childNode
                    }
                }
            }], { $project: {quetion : 1}},)

            let arrayOFQuetion = [];
            for (const question of quetions) {
                arrayOFQuetion.push(`Question ${question.question}`)
            }
            res.json(arrayOFQuetion)
        } else {
            res.status(401).json({
                "message": "Please provide valid annotation"
            })
        }
    } else {
        res.status(501).json({
            "message": "Please provide valid query parameter with ?q="
        })
    }
})


module.exports = router;
