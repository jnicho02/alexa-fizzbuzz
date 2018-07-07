var expect = require('chai').expect
var fizzbuzz = require('../fizzbuzz')

describe('fizzbuzz answer', function() {
  describe('1', function() {
    it('should be 1', function() {
      expect(fizzbuzz.answer(1)).to.equal('1')
    })
  })
  describe('2', function() {
    it('should be 2', function() {
      expect(fizzbuzz.answer(2)).to.equal('2')
    })
  })
  describe('3', function() {
    it('should be fizz', function() {
      expect(fizzbuzz.answer(3)).to.equal('fizz')
    })
  })
  describe('4', function() {
    it('should be 4', function() {
      expect(fizzbuzz.answer(4)).to.equal('4')
    })
  })
  describe('5', function() {
    it('should be buzz', function() {
      expect(fizzbuzz.answer(5)).to.equal('buzz')
    })
  })
  describe('6', function() {
    it('should be fizz', function() {
      expect(fizzbuzz.answer(6)).to.equal('fizz')
    })
  })
  describe('15', function() {
    it('should be fizz buzz', function() {
      expect(fizzbuzz.answer(15)).to.equal('fizz buzz')
    })
  })
})
