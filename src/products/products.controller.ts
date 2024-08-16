import { Controller, Delete, Post, Param, Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './../db';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public deleteById(@Param('id') id: string) {
    return this.productsService.deleteById(id);
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
