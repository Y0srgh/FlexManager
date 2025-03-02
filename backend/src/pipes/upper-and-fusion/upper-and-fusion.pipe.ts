import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: {data: string[]}, metadata: ArgumentMetadata) {
    if(metadata.type === 'body' && metadata.data){
      //traitement
      return entry.data.map((element)=>element.toUpperCase()).join('-')
    }
   
    return entry;
  }
}
