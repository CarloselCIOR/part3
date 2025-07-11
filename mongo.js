const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://carloselcior:${password}@cluster0.xyxkqy6.mongodb.net/?retryWrites=true&w=majority&appName=PhonebookApp`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema  )

if (process.argv.length == 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(entry => {
      console.log(entry.name + ' ' + entry.number)
    })
    mongoose.connection.close()
  }).then(() => {
    process.exit(1)
  })
}


if (process.argv.length == 5) {
    console.log('Adding new entry to phonebook...')
    const name = process.argv[3]
    const number = process.argv[4]

    const entry = new Person({
    name: name,
    number: number,
    })

    entry.save().then(result => {
    console.log('Added ' + name + ' number ' + number + ' to phonebook')
    mongoose.connection.close()
    })
}