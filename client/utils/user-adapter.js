module.exports = {
  getClientUser(serverUser) {
    let clientUser = serverUser;

    clientUser.stuId = serverUser.id;
    clientUser.stuName = serverUser.name;
    clientUser.stuLanguage = serverUser.language;

    return clientUser;
  },

  getServerUser(clientUser) {
    let serverUser = clientUser;

    serverUser.id = clientUser.stuId;
    serverUser.name = clientUser.stuName;
    serverUser.language = clientUser.stuLanguage;

    return serverUser;
  }
};