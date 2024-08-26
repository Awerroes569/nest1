import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Client[]> {
    return this.prismaService.client.findMany();
  }

  public getAllExtended(): Promise<Client[]> {
    return this.prismaService.client.findMany({ include: { orders: true } });
  }

  public getById(id: Client['id']): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { id },
    });
  }

  public getByIdExtended(id: Client['id']): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  public deleteById(id: Client['id']): Promise<Client> {
    return this.prismaService.client.delete({
      where: { id },
    });
  }

  public async create(
    orderData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Client> {
    const { name, address } = orderData;
    return await this.prismaService.client.create({
      data: {
        name,
        address,
      },
    });
  }

  public updateById(
    id: Client['id'],
    orderData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Client> {
    const { name, address } = orderData;
    return this.prismaService.client.update({
      where: { id },
      data: {
        name,
        address,
      },
    });
  }
}
