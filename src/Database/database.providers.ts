import { createConnection } from 'typeorm';

// export const databaseProviders = [
//     {
//         provide: 'TypeORMInstance',
//         useFactory: async () => await createConnection({
//             type: 'postgres',
//             host: 'localhost',
//             port: 5432,
//             username: 'postgres',
//             password: 'zyf1994',
//             database: 'mytest7',
//             entities: [
//                 __dirname + '/../*/*.entity{.ts,.js}',
//                 'src/User/Users.entity.ts',
//             ],
//             logging: true,
//             synchronize: true,
//         }),
//     },
// ];

// export const databaseProviders = [
//     {
//         provide: 'TypeORMInstance',
//         useFactory: async () => await createConnection({
//             type: 'postgres',
//             host: 'db',
//             port: 5432,
//             username: 'postgres',
//             password: '12345',
//             database: 'phr',
//             entities: [
//                 __dirname + '/../**/*.entity{.ts,.js}',
//             ],
//             logging: true,
//             synchronize: true,
//         }),
//     },
// ];

export const databaseProviders = [
    {
        provide: 'TypeORMInstance',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'ec2-23-23-226-190.compute-1.amazonaws.com',
            port: 5432,
            username: 'meocnzjebzvbsw',
            password: '0ba7f313427839e71cf5bafffdd9d5ab40f06495f1ab7dbe54713c9bce5c6661',
            database: 'd7093s7ahmkbja',
            entities: [
                __dirname + '/../*/*.entity{.ts,.js}',
                'src/User/Users.entity.ts',
            ],
            logging: true,
            synchronize: true,
        }),
    },
];
