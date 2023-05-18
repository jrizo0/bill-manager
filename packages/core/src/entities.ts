import { CreateEntityItem, Entity, EntityItem, QueryResponse, Service } from 'electrodb'
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
      name: {
        type: 'string',
        required: true,
      },
      email: {
        type: 'string',
        required: true,
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
      userLookup: {
        collection: 'belong',
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['userID'],
        },
        sk: {
          field: 'gsi1sk',
          composite: [],
        },
      }
    },
  },
  Dynamo.service
)
export type UserItem = EntityItem<typeof UserEntity>;
export type CreateUserItem = CreateEntityItem<typeof UserEntity>;
export type UserQueryResponse = QueryResponse<typeof UserEntity>;

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
      },
      name: {
        type: 'string',
        required: true,
      },
    },
    indexes: {
      group: {
        collection: 'members',
        pk: {
          field: 'pk',
          composite: ['groupID'],
        },
        sk: {
          field: 'sk',
          composite: [],
        },
      },
    },
  },
  Dynamo.service
)
export type GroupItem = EntityItem<typeof GroupEntity>;
export type CreateGroupItem = CreateEntityItem<typeof GroupEntity>;
export type GroupQueryResponse = QueryResponse<typeof GroupEntity>;

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
    },
    indexes: {
      relation: {
        collection: 'members',
        pk: {
          field: 'pk',
          composite: ['groupID'], // ¿allows many groups??
        },
        sk: {
          field: 'sk',
          composite: ['userID'],
        },
      },
      user: {
        index: 'gsi1',
        collection: 'belong',
        pk: {
          field: 'gsi1pk',
          composite: ['userID'],
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
        required: true,
        validate: (date: string) => {
          if (!moment(date).isValid) {
            throw new Error('Invalid date format')
          }
        },
      },
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
export type BillItem = EntityItem<typeof BillEntity>;
export type CreateBillItem = CreateEntityItem<typeof BillEntity>;
export type BillQueryResponse = QueryResponse<typeof BillEntity>;

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
        required: true,
      },
      billID: {
        type: 'string',
        required: true,
      },
      userID: {
        type: 'string',
        required: true,
      },
      month: {
        type: 'number',
        required: true,
      },
      year: {
        type: 'number',
        required: true,
      },
      created: {
        type: 'string',
        required: true,
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
          composite: ['month', 'year'],
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
          composite: ['created'],
        },
      },
    },
  },
  Dynamo.service
)
export type PaymentItem = EntityItem<typeof PaymentEntity>;
export type CreatePaymentItem = CreateEntityItem<typeof PaymentEntity>;
export type PaymentQueryResponse = QueryResponse<typeof PaymentEntity>;

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
