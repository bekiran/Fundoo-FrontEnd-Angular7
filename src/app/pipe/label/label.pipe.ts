import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    console.log(value,"value")
    return value.filter(array=>
      array.label.toLowerCase().indexOf(args.toLowerCase()) !==-1,
    )
  }

  
}
