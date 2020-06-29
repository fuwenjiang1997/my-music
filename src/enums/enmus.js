class Singer {
  constructor(key) {
    if (key === 0) {
      this.addLetter(key, '热门')
    } else {
      this.addLetter(key, String.fromCharCode(key + 64))
    }
  }
  addLetter(key, value) {
    this[key] = value
  }
  getLetterKey() {
    return Object.keys(this)[0]
  }
  getLetterValue() {
    return Object.values(this)[0]
  }
}

export const singerLetter = function (arr) {
  let res = {}
  arr.forEach((item, index) => {
    Object.assign(res, new Singer(index))
  })
  return res
}