module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {import("../../Structures/bot")} client
   */
  async execute(client) {
    /*
      different types for statuses can be a number and they as follows:
      Playing: 0
      Streaming: 1
      Listening: 2
      Watching: 3
      Competing: 5
          
      Want a changing status? Just change line 56 to `status: obj[key].status` and insert your own status into each object below.
      Different statuses include "online", "idle", "dnd", and "invisible"
    */
    let acts = [
      {
        name: "@Developer",
        type: 3,
        status: "idle",
      },
      {
        name: `Codes`,
        type: 2,
        status: "idle",
      },
      // {
      //   name:"",
      //   type: Number,
      //   status: ""
      // }
    ];
    setInterval(async () => {
      const currentAct = acts.shift();
      client.user.setPresence({
        activities: [
          {
            name: currentAct.name.toString(),
            type: currentAct.type,
          },
        ],
        status: currentAct.status,
        /**
         * Don't want a changing status? Just change the line above to `status: "status"`. Different statuses include "online", "idle", "dnd", and "invisible"
         */
      });
      acts.push(currentAct);
    }, 15000);
  },
};
