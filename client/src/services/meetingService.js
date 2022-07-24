import axios from "../axios"

const meetingService = {
	addMeeting: async (data) => {
		return await axios.post("/meeting/addMeeting", data)
	},

	getMeeting: async (id) => {
		return await axios.get("/meeting/getMeeting/" + id)
	},

	voteDatetimes: async (data) => {
		return await axios.post("/meeting/voteDatetimes", data)
	},

	// getMostVoted: async (id) => {
	// 	return await axios.get("/meeting/getMostVoted/" + id)
	// },

	getMostVoted: async (id) => {
		return await axios.get("/meeting/decideDatetime/" + id)
	},

	selectFinalDatetime: async (meeting) => {
		return await axios.post("/meeting/selectFinalDatetime", meeting)
	}
}

export default meetingService
