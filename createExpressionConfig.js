const createExpressionConfig = (tableName, model) => {
  switch (tableName) {
    case "matches":
      return {
        UpdateExpression: `
      SET
      awayTeam = :awayTeam,
      #date = :date,
      homeTeam = :homeTeam,
      leagueId = :leagueId,
      #location = :location,
      #name = :name,
      officiating = :officiating,
      seasonId = :seasonId,
      #time = :time
    `,
        ExpressionAttributeValues: {
          ":awayTeam": model.awayTeam,
          ":date": model.date,
          ":homeTeam": model.homeTeam,
          ":leagueId": model.leagueId,
          ":location": model.location,
          ":name": model.name,
          ":officiating": model.officiating,
          ":seasonId": model.seasonId,
          ":time": model.time,
        },
        ExpressionAttributeNames: {
          "#date": "date",
          "#location": "location",
          "#name": "name",
          "#time": "time",
        },
      };
    case "seasons":
      return {
        UpdateExpression: `
      SET
      #start = :start,
      #end = :end,
      games = :games,
      leagueId = :leagueId,
      #name = :name,
      cadence = :cadence,
      matches = :matches
    `,
        ExpressionAttributeValues: {
          ":start": model.start,
          ":end": model.end,
          ":games": model.games,
          ":leagueId": model.leagueId,
          ":name": model.name,
          ":cadence": model.cadence,
          ":matches": model.matches,
        },
        ExpressionAttributeNames: {
          "#name": "name",
          "#start": "start",
          "#end": "end",
        },
      };
    case "players":
      return {
        UpdateExpression: `
      SET
      image = :image,
      team = :team,
      #position = :position,
      league = :league,
      #name = :name,
      agency = :agency,
      onlineStatus = :onlineStatus
    `,
        ExpressionAttributeValues: {
          ":image": model.image,
          ":team": model.team,
          ":position": model.position,
          ":league": model.league,
          ":name": model.name,
          ":agency": model.agency,
          ":onlineStatus": model.onlineStatus,
        },
        ExpressionAttributeNames: {
          "#name": "name",
          "#position": "position",
        },
      };
    case "teams":
      return {
        UpdateExpression: `
      SET
      image = :image,
      badge = :badge,
      players = :players,
      league = :league,
      #name = :name,
      #limit = :limit,
      #record = :record,
      active = :active
    `,
        ExpressionAttributeValues: {
          ":image": model.image,
          ":badge": model.badge,
          ":players": model.players,
          ":league": model.league,
          ":name": model.name,
          ":limit": model.limit,
          ":record": model.record,
          ":active": model.active,
        },
        ExpressionAttributeNames: {
          "#name": "name",
          "#limit": "limit",
          "#record": "record",
        },
      };
    case "Leagues":
      return {
        UpdateExpression: `
      SET
      image = :image,
      badge = :badge,
      teams = :teams,
      seasonId = :seasonId,
      #name = :name,
      #limit = :limit
    `,
        ExpressionAttributeValues: {
          ":image": model.image,
          ":badge": model.badge,
          ":teams": model.teams,
          ":seasonId": model.seasonId,
          ":name": model.name,
          ":limit": model.limit,
        },
        ExpressionAttributeNames: {
          "#name": "name",
          "#limit": "limit",
        },
      };
  }
};

module.exports = createExpressionConfig;
