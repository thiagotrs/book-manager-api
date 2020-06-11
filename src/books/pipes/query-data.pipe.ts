import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class QueryDataPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      if (value.publisher) {
        value.publisher = Number(value.publisher);
      }
      if (value.authors) {
        value.authors = value.authors.split(',');
      }
      if (value.genres) {
        value.genres = value.genres.split(',');
      }
    }

    return value;
  }
}
