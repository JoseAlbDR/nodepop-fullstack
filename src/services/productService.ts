import day from 'dayjs';
import _ from 'lodash';
import mongoose from 'mongoose';

import { Product } from '../models/ProductModel';
import { IProduct, IUpdateProduct } from '../types/productInterfaces';
import { IProductQuery } from '../types/queryInterfaces';
import { Likes } from '../models/Likes';

const productService = {
  getAllProducts: (query: IProductQuery) => {
    const results = Product.find(query)
      .populate({
        path: 'createdBy',
        select: 'name email',
      })
      .populate('likes');

    return results;
  },

  getFavoriteProducts: async (userId: mongoose.Types.ObjectId) => {
    const userLikes = await Likes.find({ user: userId }).populate({
      path: 'product',
    });

    const productIds = userLikes.map((like) => like.product);

    // Busca los productos que tienen esos IDs.
    const favoriteProducts = await Product.find({ _id: { $in: productIds } })
      .populate({
        path: 'createdBy',
        select: 'name email',
      })
      .populate('likes');

    return favoriteProducts;
  },

  countProducts: async (
    query: IProductQuery,
    userId?: mongoose.Types.ObjectId
  ) => {
    if (userId) query.createdBy = userId;

    return await Product.countDocuments(query);
  },

  getUserProducts: (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>,
    query: IProductQuery
  ) => {
    const products = Product.find({
      createdBy: userId,
      ...query,
    })
      .populate({
        path: 'createdBy',
        select: 'name email',
      })
      .populate('likes');
    return products;
  },

  createProduct: async (product: IProduct) => {
    const result = await Product.create(product);
    return result;
  },

  getOneProduct: async (id: string) => {
    const result = await Product.findById(id).populate({
      path: 'createdBy',
      select: 'name email',
    });
    return result;
  },

  updateProduct: async (id: string, updates: IUpdateProduct) => {
    const result = Product.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });
    return result;
  },

  deleteProduct: async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
  },

  getAllTags: async (): Promise<string[]> => {
    const result = await Product.find({});
    const uniqueTags = _.uniq(result.flatMap((item) => item.tags));
    return uniqueTags;
  },

  showStats: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
  ) => {
    interface AggregatedStats {
      _id: boolean;
      count: number;
    }

    const stats: AggregatedStats[] = await Product.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId as string),
        },
      },
      { $group: { _id: '$onSale', count: { $sum: 1 } } },
    ]);

    const initialAccumulator: Record<string, number> = {
      onSale: 0,
      userTotal: 0,
      search: 0,
    };

    let resultStats = stats.reduce((acc, curr) => {
      const { _id, count } = curr;
      const title = _id ? 'onSale' : 'search';
      acc[title] = count;
      acc.userTotal += count;
      return acc;
    }, initialAccumulator);

    resultStats = {
      onSale: resultStats.onSale || 0,
      search: resultStats.search || 0,
      userTotal: resultStats.userTotal || 0,
    };

    let monthlyProducts = await Product.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId as string) } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
    ]);

    monthlyProducts = monthlyProducts
      .map((item: { _id: { year: number; month: number }; count: number }) => {
        const {
          _id: { year, month },
          count,
        } = item;

        const date = day()
          .month(month - 1)
          .year(year)
          .format('YY MMM');

        return { date, count };
      })
      .reverse();

    return { resultStats, monthlyProducts };
  },
};

export default productService;
