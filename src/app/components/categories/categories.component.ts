import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any> = [];
  formId?: string;
  formCategory?: string;
  formStatus: string = 'Add';

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(value => {
      this.categoryArray = value;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    };

    if(this.formStatus == 'Add') {
      this.categoriesService.saveData(categoryData);
    }
    else if(this.formStatus == 'Edit') {
      this.categoriesService.updateData(this.formId, categoryData);
      this.formStatus = 'Add';
    }

    formData.reset();
  }

  onEdit(category: string, id: string) {
    this.formCategory = category;
    this.formId = id;
    this.formStatus = 'Edit';
  }

  onDelete(id: string) {
    this.categoriesService.deleteData(id);
  }
}
