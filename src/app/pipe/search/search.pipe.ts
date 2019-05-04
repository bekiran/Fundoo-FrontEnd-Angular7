import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value,'value in pipe',args);
    
    if(!value) return null;
    if(!args) return value;


    return value.filter(array=>
      array.title.toLowerCase().indexOf(args.toLowerCase()) !==-1 || array.description.toLowerCase().indexOf(args.toLowerCase()) !==-1)
      
  }

}
