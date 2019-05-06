
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Topic = require('../models/topics');
const User = require('../models/users');
const Comment = require('../models/comments');
const io = require('../../socket');
const mongoose = require('mongoose');

router.get('/getComments/:TopicId', (req, res, next) => {

    const TopicId = req.params.TopicId;

    Topic.findById({ _id: req.params.TopicId })
        .then(topic => {
            if (!topic) {
                res.status(404).json({
                    message: "Bulunamadı"
                })
            }
            else {
                Comment.find({ Topic: TopicId }).select('_id CommentContent CommentTime User').populate('User', 'Email').exec().then(result => {
                    res.status(200).json(result);
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})
router.post('/postComments', checkAuth, (req, res, next) => {

    User.findById(req.userData.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "Kullanıcı bulunamadı."
                });
            }
            Topic.findById(req.body.Topic).then(topic => {

                if (!topic) {
                    return res.status(404).json({
                        message: "Kullanıcı bulunamadı."
                    });
                }
                const comment = new Comment({
                    _id: new mongoose.Types.ObjectId,
                    CommentContent: req.body.CommentContent,
                    CommentTime: req.body.CommentTime,
                    User: req.userData.userId,
                    Topic: req.body.Topic
                });
                comment.save().then(result => {
                    user.Comments.push(result);
                    user.save();
                    topic.Comments.push(result);
                    topic.save();
                    console.log(result.Topic);
                    io.getIO().to(result.Topic).emit('sendMessage', {
                        comment: {
                            _id: result._id,
                            CommentContent: result.CommentContent,
                            CommentTime: result.CommentTime,
                            User: {
                                _id: user._id,
                                Email: user.Email
                            }
                        }
                    });
                    console.log("başarılı");
                    return res.status(200).json({
                        message: "Kayıt başarılıdır"
                    });
                }).catch(err => {
                    return res.status(500).json({
                        message: "Kayıtta hata"
                    })
                })
            }).catch(err => {
                return res.status(500).json({
                    message: "İstekte hata"
                });
            })

        })
        .catch(err => {
            return res.status(500).json({
                message: "İstekte hata."
            });
        })

})

module.exports = router;

