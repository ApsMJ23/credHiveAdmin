import { faker } from '@faker-js/faker';
import {convertCamelCaseToSentenceCase} from "../utils/utility.ts";
import dayjs from "dayjs";

export const ModalData = [{
    emails: [
        {
            id: 1,
            email: faker.internet.email(),
            type: 'Finance'
        },
        {
            id: 2,
            email: faker.internet.email(),
            type: 'Admin'
        },
        {
            id: 3,
            email: faker.internet.email(),
            type: 'Support'
        }
    ],
    supportingDocuments: [
        {
            id: 1,
            name: faker.system.fileName(),
            type: 'pdf'
        },
        {
            id: 2,
            name: faker.system.fileName(),
            type: 'pdf'
        },
        {
            id: 3,
            name: faker.system.fileName(),
            type: 'pdf'
        }
    ],

}]

export const TableData = {
    companyName: faker.company.name(),
    informalName: faker.company.catchPhraseNoun(),
    recentEditor: faker.person.fullName(),
    updatedOn: faker.date.recent().toLocaleDateString(),
    previousChanges: faker.number.int({min: 0, max: 100 }),
}

// Make A column header array based on fakeData object
export const FakeDataHeaders = Object.keys(TableData).map((key,index) => ({
    name: convertCamelCaseToSentenceCase(key),
    key: index
}));

FakeDataHeaders.push({name: 'Actions', key: FakeDataHeaders.length});


// make an array of objects of length 10 using the fakeData object using the faker library
export const FakeDataArray = Array.from({length: 1000}, () => {
    return({
        companyName: faker.company.name(),
        informalName: faker.company.catchPhraseNoun(),
        recentEditor: faker.person.fullName(),
        updatedOn: dayjs(faker.date.recent()).format('DD MMM YYYY'),
        previousChanges: faker.number.int({min: 0, max: 100 }),
    })
});

