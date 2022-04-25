const express = require("express")

const MeetingController = require("../controllers/meeting")

const router = express.Router()

//Routes
router.get("/getAllMeetings", MeetingController.verifyToken, MeetingController.getAllMeetings)
router.get("/test", MeetingController.test)
// router.post('/save', DatetimesController.saveProject);
// router.get('/getProject/:project_id', DatetimesController.getProject);
router.get("/getMeeting/:meetId", MeetingController.getMeeting)
router.post("/addMeeting/", MeetingController.verifyToken, MeetingController.addMeeting)
router.put("/updateMeeting/:meetId", MeetingController.verifyToken, MeetingController.updateMeeting)
router.delete("/deleteMeeting/:meetId", MeetingController.verifyToken, MeetingController.deleteMeeting)

router.post('/addDatetime/', MeetingController.verifyToken, MeetingController.addDatetime);
router.post('/voteDatetimes/', MeetingController.voteDatetimes);
router.get('/getMostVoted/:meeting_id', MeetingController.verifyToken, MeetingController.getMostVoted);
router.get('/decideDatetime/:meeting_id', MeetingController.decideDatetime);

module.exports = router
