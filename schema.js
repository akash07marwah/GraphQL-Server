const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')


const customers = [
    {
        id:1,
        name:'Akash Marwah',
        email:'akash@gmail.com',
        age:19
    },
    {
        id:2,
        name:'Aman',
        email:'aman@gmail.com',
        age:25
    },
    {
        id:3,
        name:'Arun Goel',
        email:'arun@gmail.com',
        age:34
    },
    {
        id:4,
        name:'Anup Jalota',
        email:'anup@gmail.com',
        age:55
    }

]


const CustomerType = new GraphQLObjectType({
    name:'CustomerType',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer: {
            type:CustomerType,
            args: {
                id : {type:GraphQLString},
            },
            resolve(parentValue, args){
                for(let i=0;i<customers.length;i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
  
})

module.exports = new GraphQLSchema({
    query:RootQuery
}) 