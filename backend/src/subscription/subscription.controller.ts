// src/subscription/subscription.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SubscriptionsService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subscription> {
    return this.subscriptionsService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    return this.subscriptionsService.update(Number(id), updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subscriptionsService.remove(Number(id));
  }
}