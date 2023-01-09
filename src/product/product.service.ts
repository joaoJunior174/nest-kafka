import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly producerService: ProducerService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(product: CreateProductDto): Promise<ProductDocument> {
    const createdProduct = new this.productModel(product);
    const productDocument = await createdProduct.save();
    await this.producerService.produce({
      topic: 'log-study',
      messages: [
        {
          value: `[PRODUCT CREATE]:  ${JSON.stringify(product)}`,
        },
      ],
    });
    return productDocument;
  }
}
