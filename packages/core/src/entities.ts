import {
  CreateEntityItem,
  CustomAttributeType,
  Entity,
  EntityItem,
  QueryResponse,
  Service,
} from 'electrodb'
import { Dynamo } from './dynamodb'
import { ulid } from 'ulid'
import moment from 'moment'

export const UserEntity = new Entity(
  {
    model: {
      entity: 'user',
      version: '1',
      service: 'billmanager',
    },
    attributes: {
      userID: {
        type: 'string',
        required: true,
      },
      email: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      created: {
        type: 'string',
        set: () => moment.utc().format(),
        readOnly: true,
      },
    },
    indexes: {
      byUser: {
        pk: {
          field: 'pk',
          composite: ['userID'],
        },
        sk: {
          field: 'sk',
          composite: [],
        },
      },
      email: {
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['email'],
        },
        sk: {
          field: 'gsi1sk',
          composite: ['created'],
        },
      },
      userLookup: {
        index: 'gsi2',
        collection: 'belong',
        pk: {
          field: 'gsi2pk',
          composite: ['userID'],
        },
        sk: {
          field: 'gsi2sk',
          composite: [],
        },
      },
    },
  },
  Dynamo.service
)
export type UserItem = EntityItem<typeof UserEntity>
export type CreateUserItem = CreateEntityItem<typeof UserEntity>
export type UserQueryResponse = QueryResponse<typeof UserEntity>

const GroupEntity = new Entity(
  {
    model: {
      entity: 'group',
      version: '1',
      service: 'billmanager',
    },
    attributes: {
      groupID: {
        type: 'string',
        default: () => ulid(),
        readOnly: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      created: {
        type: 'string',
        set: () => moment.utc().format(),
        readOnly: true,
      },
    },
    indexes: {
      group: {
        pk: {
          field: 'pk',
          composite: ['groupID'],
        },
        sk: {
          field: 'sk',
          composite: [],
        },
      },
      groupLookup: {
        collection: 'members',
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['groupID'],
        },
        sk: {
          field: 'gsi1sk',
          composite: [],
        },
      },
    },
  },
  Dynamo.service
)
export type GroupItem = EntityItem<typeof GroupEntity>
export type CreateGroupItem = CreateEntityItem<typeof GroupEntity>
export type GroupQueryResponse = QueryResponse<typeof GroupEntity>

const MembershipEntity = new Entity(
  {
    model: {
      entity: 'membership',
      version: '1',
      service: 'billmanager',
    },
    attributes: {
      groupID: {
        type: 'string',
        required: true,
      },
      userID: {
        type: 'string',
        required: true,
      },
      joined: {
        type: 'string',
        set: () => moment.utc().format(),
        readOnly: true,
      },
    },
    indexes: {
      relation: {
        pk: {
          field: 'pk',
          composite: ['groupID', 'userID'],
        },
        sk: {
          field: 'sk',
          composite: [],
        },
      },
      group: {
        index: 'gsi1',
        collection: 'members',
        pk: {
          field: 'gsi1pk',
          composite: ['groupID'],
        },
        sk: {
          field: 'gsi1sk',
          composite: ['joined'],
        },
      },
      user: {
        index: 'gsi2',
        collection: 'belong',
        pk: {
          field: 'gsi2pk',
          composite: ['userID'],
        },
        sk: {
          field: 'gsi2sk',
          composite: ['joined'],
        },
      },
    },
  },
  Dynamo.service
)

const BillEntity = new Entity(
  {
    model: {
      entity: 'bill',
      version: '1',
      service: 'billmanager',
    },
    attributes: {
      billID: {
        type: 'string',
        default: () => ulid(),
        readOnly: true,
      },
      groupID: {
        type: 'string',
        required: true,
      },
      lastPayment: {
        type: 'string',
        required: true,
        default: '',
      },
      tag: {
        type: 'string',
        required: true,
      },
      paymentWeb: {
        type: 'string',
        required: true,
      },
      expirationDay: {
        type: 'number',
        required: true,
      },
      reference: {
        type: 'string',
        required: true,
      },
      created: {
        type: 'string',
        set: () => moment.utc().format(),
        readOnly: true,
      },
      // trashed: {
      //   type: 'string',
      // },
    },
    indexes: {
      bill: {
        pk: {
          field: 'pk',
          composite: ['billID'],
        },
        sk: {
          field: 'sk',
          composite: ['groupID'],
        },
      },
      group: {
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['groupID'],
        },
        sk: {
          field: 'gsi1sk',
          composite: [],
        },
      },
      billLookup: {
        collection: 'record',
        index: 'gsi2',
        pk: {
          field: 'gsi2pk',
          composite: ['billID'],
        },
        sk: {
          field: 'gsi2sk',
          composite: [],
        },
      },
    },
  },
  Dynamo.service
)
export type BillItem = EntityItem<typeof BillEntity>
export type CreateBillItem = CreateEntityItem<typeof BillEntity>
export type BillQueryResponse = QueryResponse<typeof BillEntity>

type payer = {
  userID: string
  email: string
  name: string
}

const PaymentEntity = new Entity(
  {
    model: {
      entity: 'payment',
      version: '1',
      service: 'billmanager',
    },
    attributes: {
      paymentID: {
        type: 'string',
        default: () => ulid(),
        readOnly: true,
      },
      billID: {
        type: 'string',
        required: true,
      },
      user: {
        type: CustomAttributeType<payer>('any'),
        required: true,
      },
      created: {
        type: 'string',
        set: (date?: string) =>
          date ? moment.utc(date).format() : moment.utc().format(),
      },
      month: {
        type: 'number',
        watch: ['created'],
        set: (_, { created }) => {
          return moment(created).month()
        },
      },
      year: {
        type: 'number',
        watch: ['created'],
        set: (_, { created }) => {
          return moment(created).year()
        },
      },
      attachment: {
        type: 'string',
      },
      ammount: {
        type: 'number',
      },
    },
    indexes: {
      payment: {
        pk: {
          field: 'pk',
          composite: ['paymentID'],
        },
        sk: {
          field: 'sk',
          composite: ['billID'],
        },
      },
      bill: {
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['billID'],
        },
        sk: {
          field: 'gsi1sk',
          composite: ['year', 'month'],
        },
      },
      history: {
        index: 'gsi2',
        collection: 'record',
        pk: {
          field: 'gsi2pk',
          composite: ['billID'],
        },
        sk: {
          field: 'gsi2sk',
          composite: ['created', 'month', 'year'],
        },
      },
    },
  },
  Dynamo.service
)
export type PaymentItem = EntityItem<typeof PaymentEntity>
export type CreatePaymentItem = CreateEntityItem<typeof PaymentEntity>
export type PaymentQueryResponse = QueryResponse<typeof PaymentEntity>

export const BillManager = new Service(
  {
    bill: BillEntity,
    payment: PaymentEntity,
    user: UserEntity,
    group: GroupEntity,
    membership: MembershipEntity,
  },
  Dynamo.service
)
