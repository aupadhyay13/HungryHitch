import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect("mongodb+srv://aditya20360:RiOFyKGywiwtU4wd@cluster0.3icmzdh.mongodb.net/HungryHitch", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("Database connected successfully"),
        (error) => console.log(error)
    )
}