const Meeting = require("../models/meeting") // date times model
const crypto = require("crypto")

var MeetingController = {
	test: (req, res) => {
		res.status(200).send("Funciona!")
	},

	getAllMeetings: (req, res) => {
		Meeting.find({}).exec((error, meetings) => {
			if (error) return res.status(500).send({ message: "Error al cargar los Meetings" })

			if (!meetings) return res.status(404).send({ message: "No se han podido cargar los Meetings" })

			return res.status(200).send({
				meetings: meetings,
			})
		})
	},

	getMeeting: (req, res) => {
		var meetId = req.params.meetId

		if (meetId == null) {
			return res.status(404).send("No existe el meeting")
		}

		Meeting.findById(meetId, (err, meeting) => {
			if (err) {
				return res.status(500).send({
					success: false,
					error: err.message,
				})
			}
			if (!meeting) {
				return res.status(404).send("No existe el meeting")
			}
			return res.status(200).send({
				meeting,
			})
		})
	},

	addMeeting: (req, res) => {
		var meeting = new Meeting()
		var params = req.body
		meeting.meetId = crypto.randomBytes(16).toString("hex")
		meeting.description = params.description
		meeting.ownerId = params.ownerId
		meeting.title = params.title
		meeting.location = params.location
		meeting.weather = params.weather

		meeting.save((error, meetingStored) => {
			if (error) return res.status(500).send({ message: "Error al guardar" })

			if (!meetingStored) return res.status(404).send({ message: "No se ha podido guardar el meeting" })

			return res.status(200).send({
				meeting: meetingStored,
			})
		})
	},

	updateMeeting: (req, res) => {
		var meetId = req.params.meetId
		var fieldsToUpdate = req.body

		Meeting.findByIdAndUpdate(meetId, fieldsToUpdate, (error, meetingUpdated) => {
			if (error) return res.status(500).send({ message: "Error al actualizar" })

			if (!meetingUpdated) return res.status(404).send({ message: "No existe el meeting para actualizar" })

			return res.status(200).send({
				meeting: meetingUpdated,
			})
		})
	},

	deleteMeeting: (req, res) => {
		var meetId = req.params.meetId
		Meeting.findByIdAndDelete(meetId, function (error, meetingDeleted) {
			if (error) return res.status(500).send({ message: "Error al eliminar" })

			if (!meetingDeleted) return res.status(404).send({ message: "No existe el meeting para eliminar" })

			return res.status(200).send({
				meeting: meetingDeleted,
			})
		})
	},
}

module.exports = MeetingController
