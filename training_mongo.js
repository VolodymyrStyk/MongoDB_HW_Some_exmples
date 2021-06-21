db.getCollection('teacher').find({
    $or:[
    {payment:2500},
    {payment:2200},
    {class_curator: 6}
    ]},
        {
        name: 1,
        payment: 1,
     }
    )


