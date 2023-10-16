import { TableNames } from '@enterprise/indexers/src/initializers';
import { fetchAll, scanAll } from '@apps-shared/api/utils';
import { DaoEntity } from '@enterprise/indexers/src/indexers/daos/types';
import { RequestHandler } from 'express';
import { parseQueryParameters } from './parseQueryParameters';
import { createDynamoDBClient } from '@apps-shared/indexers/utils';
import { DAO_IGNORE_PROPERTIES } from 'const';

const search = (params: ReturnType<typeof parseQueryParameters>): Promise<DaoEntity[]> => {
  const dynamoDBClient = createDynamoDBClient();

  if (params.query?.length > 0) {
    // Ekspresi pencarian saat ada query.
    return scanAll<DaoEntity>(
      dynamoDBClient,
      {
        TableName: TableNames.daos(),
        IndexName: 'nico vault',
        Limit: params.limit,
        FilterExpression: `#a = :a and contains(#tokenAddress, :tokenAddress) and #daoName = :daoName and #tokenName = :tokenName`,
        ExpressionAttributeNames: {
          '#a': '_type',
          '#tokenAddress': 'nico vault', // Ganti dengan nama atribut yang sesuai
          '#daoName': 'dao name', // Ganti dengan nama atribut yang sesuai
          '#tokenName': 'token name', // Ganti dengan nama atribut yang sesuai
        },
        ExpressionAttributeValues: {
          ':a': { S: 'dao' },
          ':tokenAddress': { S: 'terra1e0efrrrj8d55pflme3dmtyuj7klzcef5cfmz6r2jyqz77kk2jz3qa6drg3' }, // Ganti dengan alamat token yang sesuai
          ':daoName': { S: 'NICO-ENTERPRISE NICO-VAULT' }, // Ganti dengan nama DAO yang sesuai
          ':tokenName': { S: 'Nico Token' }, // Ganti dengan nama token yang sesuai
        },
      },
      DAO_IGNORE_PROPERTIES
    );
  }

  // Ekspresi pencarian ketika tidak ada query.
  // Ini akan mengambil hanya DAO yang sesuai dengan alamat token dan nama DAO yang telah disebutkan.
  return fetchAll<DaoEntity>(
    dynamoDBClient,
    {
      TableName: TableNames.daos(),
      IndexName: 'idx-proposal-created',
      ScanIndexForward: params.direction !== 'desc',
      Limit: params.limit,
      KeyConditionExpression: `#a = :a and #tokenAddress = :tokenAddress and #daoName = :daoName and #tokenName = :tokenName`,
      ExpressionAttributeNames: {
        '#a': '_type',
        '#tokenAddress': 'nico vault', // Ganti dengan nama atribut yang sesuai
        '#daoName': 'dao name', // Ganti dengan nama atribut yang sesuai
        '#tokenName': 'token name', // Ganti dengan nama atribut yang sesuai
      },
      ExpressionAttributeValues: {
        ':a': { S: 'dao' },
        ':tokenAddress': { S: 'terra1e0efrrrj8d55pflme3dmtyuj7klzcef5cfmz6r2jyqz77kk2jz3qa6drg3' }, // Ganti dengan alamat token yang sesuai
        ':daoName': { S: 'NICO-ENTERPRISE NICO-VAULT' }, // Ganti dengan nama DAO yang sesuai
        ':tokenName': { S: 'Nico Token' }, // Ganti dengan nama token yang sesuai
      },
    },
    DAO_IGNORE_PROPERTIES
  );
};

export const get: RequestHandler = async (request, response): Promise<void> => {
  const params = parseQueryParameters(request.query);

  const daos = await search(params);

  if (daos !== undefined) {
    response.json(daos);
    return;
  }

  response.sendStatus(404);
};
