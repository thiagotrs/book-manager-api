import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FormDataPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      if (value.publishedAt) {
        value.publishedAt = Number(value.publishedAt);
      }
      if (value.pages) {
        Number(value.pages);
      }
      if (value.edition) {
        Number(value.edition);
      }
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
