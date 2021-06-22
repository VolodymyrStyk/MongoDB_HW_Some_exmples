// 1) Знайти всіх дітей в яких сердня оцінка 4.2
// db.getCollection('students').find(
//         {'avgScore':4.2}
// )
//
// 2) Знайди всіх дітей з 1 класу
//db.getCollection('students').find(
//        {'class':1.0}
// )
//
// 3) Знайти всіх дітей які вивчають фізику
//db.getCollection('students').find(
//        {'lessons':'physics'}
// )
//
// 4) Знайти всіх дітей, батьки яких працюють в науці ( scientist )
//db.getCollection('students').find(
//        {'parents.profession':'scientist'}
// )
//
// 5) Знайти дітей, в яких середня оцінка більша за 4
//db.getCollection('students').find(
//        {'avgScore':{$gt:4}}
// )
//
// 6) Знайти найкращого учня
//db.getCollection('students').find().sort({'avgScore':-1}).limit(1)
//
// 7) Знайти найгіршого учня
//db.getCollection('students').find().sort({'avgScore':1}).limit(1)
//
// 8) Знайти топ 3 учнів
//db.getCollection('students').find().sort({'avgScore':-1}).limit(3)
//
// 9) Знайти середній бал по школі
// db.getCollection('students').aggregate([
//     {
//         $group:{
//               _id: 0,
//               schoolAvgScore:{$avg:'$avgScore'}
//          }
//      }
// ])
//
// 10) Знайти середній бал дітей які вивчають математику або фізику
//db.getCollection('students').aggregate([
//     {
//         $match:{
//             lessons:{
//                 $in: ['mathematics','physics']
//         }
//      }
//      },
//      {
//         $group:{
//               _id: 0,
//               lesAvgScore:{$avg:'$avgScore'}
//         }
//       }
// ])
//
// 11) Знайти середній бал по 2 класі
//db.getCollection('students').aggregate([
//     {
//         $match:{
//             class: 2}
//      },
//      {
//         $group:{
//               _id: 0,
//               avgScore_2class:{$avg:'$avgScore'}
//         }
//       }
// ])
//
// 12) Знайти дітей з не повною сімєю
//db.getCollection('students').aggregate([
//     {
//         $match:{
//             parents: { $size: 1 }}
//      }
// ])
//
// 13) Знайти батьків які не працюють
// db.getCollection('students').aggregate([
//     {
//         $match:{
//             $and:[
//             {'parents.gender':{$exists:1}},
//             {'parents.profession':null} ,
//             ]}
//      },
// ])
//--------------------------------------Вивечти тільки непрацюючих батьків
// db.getCollection('students').aggregate([
//     {
//         $unwind:"$parents"
//     },
//     {
//         $match:{
//             $and:[
//             {'parents.gender':{$exists:1}},
//             {'parents.profession':null} ,
//             ]}
//      },
//     {
//         $group:{
//               _id: '$parents',
//        }
//      }
// ])
//
// 14) Не працюючих батьків влаштувати офіціантами
// db.getCollection('students').aggregate([
//     {
//         $unwind:'$parents'
//     },
//     {
//         $match:{
//             $and:[
//             {'parents.gender':{$exists:1}},
//             {'parents.profession':null} ,
//             ]
//         }
//     },
//      {
//          $set:{"parents.profession":"Waiter"}
//      }
// ])
//
// 15) Вигнати дітей, які мають середній бал менше ніж 2.5
//db.getCollection('students').remove( {'avgScore':{$lt:2.5}} );
//
// 16) Дітям, батьки яких працюють в освіті ( teacher ) поставити 5
// db.getCollection('students').aggregate([
//     {
//         $match:{
//             $and:[
//             {'parents.gender':{$exists:1}},
//             {'parents.profession':'teacher'} ,
//             ]
//         }
//     },
//      {
//          $set:{"avgScore":"5"}
//      }
// ])
//---------------------------------
//db.getCollection('students').updateMany(
//     {'parents.profession':'teacher'},
//     { $set: { 'avgScore': 5 } }
// )
//
// 17) Знайти дітей які вчаться в початковій школі (до 5 класу) і вивчають фізику ( physics )
//db.getCollection('students').aggregate([
//     {
//         $match:{
//             $and:[
//             {'class':{$lt:5}},
//             {'lessons': 'physics'}
//             ]
//         }
//     }
// ])
//
// 18) Знайти найуспішніший клас
//db.getCollection('students').aggregate([
//       {
//         $group:{
//               _id: '$class',
//               schoolAvgScore:{$avg:'$avgScore'}
//          }
//       },
//       {
//         $sort: {
//             schoolAvgScore: -1
//          }
//        },
//        {
//          $limit : 1
//        }
// ])