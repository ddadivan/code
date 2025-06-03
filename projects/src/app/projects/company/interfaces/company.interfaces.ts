export interface IAddress {
    city: string;
    street: string;
    zipCode: string;
}

export  interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    position: string;
    departament: string;
    employWorkDate: string;
    relatedUsers?: IEmployee[];
    address: IAddress;
}

// папка для массивов
export const companyEmployees: IEmployee[] = [
    {
        id: 'USR-SF-001',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        departament: 'Development',
        employWorkDate: '2020-01-15',
        relatedUsers: [],
        address: {
            city: 'San Francisco',
            street: 'Main St',
            zipCode: '94101',
        },
    },
    {
        id: 'USR-NY-002',
        firstName: 'Jane',
        lastName: 'Smith',
        age: 28,
        email: 'jane.smith@example.com',
        position: 'UX Designer',
        departament: 'Design',
        employWorkDate: '2021-03-01',
        relatedUsers: [],
        address: {
            city: 'New York',
            street: 'Broadway',
            zipCode: '10001',
        },
    },
    {
        id: 'USR-CH-003',
        firstName: 'Michael',
        lastName: 'Johnson',
        age: 35,
        email: 'michael.j@example.com',
        position: 'Project Manager',
        departament: 'Management',
        employWorkDate: '2019-07-20',
        relatedUsers: [],
        address: {
            city: 'Chicago',
            street: 'Oak Ave',
            zipCode: '60601',
        },
    },
    {
        id: 'USR-SE-004',
        firstName: 'Emily',
        lastName: 'Brown',
        age: 25,
        email: 'emily.b@example.com',
        position: 'Frontend Developer',
        departament: 'Development',
        employWorkDate: '2022-02-10',
        relatedUsers: [],
        address: {
            city: 'Seattle',
            street: 'Pine St',
            zipCode: '98101',
        },
    },
    {
        id: 'USR-AU-005',
        firstName: 'David',
        lastName: 'Davis',
        age: 32,
        email: 'david.d@example.com',
        position: 'Backend Developer',
        departament: 'Development',
        employWorkDate: '2020-09-01',
        relatedUsers: [],
        address: {
            city: 'Austin',
            street: 'Elm St',
            zipCode: '78701',
        },
    },
    {
        id: 'USR-BO-006',
        firstName: 'Sarah',
        lastName: 'Miller',
        age: 29,
        email: 'sarah.m@example.com',
        position: 'QA Engineer',
        departament: 'Quality Assurance',
        employWorkDate: '2021-06-15',
        relatedUsers: [],
        address: {
            city: 'Boston',
            street: 'Beacon St',
            zipCode: '02108',
        },
    },
    {
        id: 'USR-DE-007',
        firstName: 'Chris',
        lastName: 'Wilson',
        age: 31,
        email: 'chris.w@example.com',
        position: 'DevOps Engineer',
        departament: 'Operations',
        employWorkDate: '2019-11-05',
        relatedUsers: [],
        address: {
            city: 'Denver',
            street: 'Cherry Creek',
            zipCode: '80202',
        },
    },
    {
        id: 'USR-PO-008',
        firstName: 'Olivia',
        lastName: 'Moore',
        age: 27,
        email: 'olivia.m@example.com',
        position: 'Data Analyst',
        departament: 'Data Science',
        employWorkDate: '2022-04-01',
        relatedUsers: [],
        address: {
            city: 'Portland',
            street: 'Hawthorne Blvd',
            zipCode: '97201',
        },
    },
    {
        id: 'USR-MI-009',
        firstName: 'Daniel',
        lastName: 'Taylor',
        age: 33,
        email: 'daniel.t@example.com',
        position: 'Product Owner',
        departament: 'Product Management',
        employWorkDate: '2018-08-01',
        relatedUsers: [],
        address: {
            city: 'Miami',
            street: 'Ocean Dr',
            zipCode: '33139',
        },
    },
    {
        id: 'USR-DA-010',
        firstName: 'Sophia',
        lastName: 'Anderson',
        age: 26,
        email: 'sophia.a@example.com',
        position: 'Technical Writer',
        departament: 'Documentation',
        employWorkDate: '2023-01-01',
        relatedUsers: [],
        address: {
            city: 'Dallas',
            street: 'Main St',
            zipCode: '75201',
        },
    },
];
