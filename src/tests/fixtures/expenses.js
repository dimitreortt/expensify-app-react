import moment from 'moment'

export default [{
  id: '1',
  description: "Compost",
  amount: 60,
  note: "don't waste your leftovers",
  createdAt: 0,
}, {
  id: '2',
  description: 'Annuality',
  amount: 350000,
  note: "pay your farm",
  createdAt: moment(0).subtract(4, 'days').valueOf(),
}, {
  id: '3',
  description: "Soap Course",
  amount: 50000,
  note: "Learn how to make your own soaps",
  createdAt: moment(0).add(4, 'days').valueOf(),
}]