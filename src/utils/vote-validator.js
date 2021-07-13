const voteValidator = (data) => {

  let voteMapper = [0, 0.5, 1, 2, 3, 5, 8, 13]
  return voteMapper.includes(data)
}

module.exports = voteValidator;
