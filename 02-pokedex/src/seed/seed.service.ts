import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // const insertPromisesArray = []; // Forma 1: Insercciones multiples
    const pokemonToInsert: { name: string; no: number }[] = []; // Forma 2: Insercciones multiples (optima)

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no }); // Forma basica
      // insertPromisesArray.push(this.pokemonModel.create({ name, no })); // Forma 1: Insercciones multiples

      pokemonToInsert.push({ name, no }); // Forma 2: Insercciones multiples (optima)
    });

    // await Promise.all(insertPromisesArray); // Forma 1: Insercciones multiples
    await this.pokemonModel.insertMany(pokemonToInsert); // Forma 2: Insercciones multiples (optima)

    return 'Seed Executed';
  }
}
