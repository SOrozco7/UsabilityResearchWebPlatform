#
TUTORIAL FOR FRONTEND COMPONENTS

##
In this tutorial we are going to learn how to make a component for the frontend of an application.  
For this tutorial we will make a component called 'question-create' to create an entity called questions on a database.  
This entity will have the following parameters: id, text, initial image, final image, initial sound and final sound.

1. Creating your frontend folder
   First, we need to open a terminal or command line and enter to the folder 'frontend/' of our project.  
   If you do not have a frontend folder, create it with the following command:  
   mkdir frontend (create the folder)  
   cd frontend (enter the folder)

2. Creating the component

   Type the following command:  
   ng generate component question-create

3. Identifying the files we need to modify

   Now, we have to modify some files for each component of the application, these files are the following:
   * frontend/src/app/components/question/create
   * 1. HTML (.html)
   * 2. CSS (.css)
   * 3. TypeScript (.ts)
   * 4. TypeScript Test (spec.ts)
   * frontend/src/app/
   * 1. app.module.ts
   * 2. app-routing.module.ts

4. The HTML and CSS files

   The HTML default file will appear with the following code:
    ```html
    <p>
    experiment-delete works!
    </p>
    ```
    The CSS default file is empty.  
    These files can be coded according to the HTML5 and CSS coding conventions.

5. The TypeScript file

   The following is an example of how to code the TypeScript File:

    ```ts
    import { Component, OnInit } from '@angular/core';
    import { CrudService } from '../../../services/crud.service';
    import { Router, ActivatedRoute } from '@angular/router';
    import { HttpErrorResponse } from '@angular/common/http';
    import { AuthService } from '../../../services/auth.service';
    import { ErrorHandlerService } from '../../../services/error-handler.service';

    @Component({
    selector: 'app-experiment-delete',
    templateUrl: './experiment-delete.component.html',
    styleUrls: ['./experiment-delete.component.css']
    })
    export class ExperimentDeleteComponent implements OnInit {

    constructor(
        private errorHandler: ErrorHandlerService,
        private crud: CrudService,
        private router: Router,
        private auth: AuthService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        console.log('Deleting');
        this.crud.delete(this.crud.models.EXPERIMENT, id)
        .subscribe(
        (res: Response) => {
            this.errorHandler.showInformativeMessage('Successfully deleted experiment.');
            this.router.navigate(['/experiments']);
        },
        (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
        }
        );
    }
    }
    ```
    As we can notice, the main steps to create this file are:

    - Import the extensions that we will use.
    - Specify on the component section the functionality of this code
    - Create a class with the name of the component
    - Define the attributes that will be used in the class
    - Declare the variables and methods that will be called in this file to apply the component functionalities.


    Note: The changes done to the .spec.ts file are beyond the reach of this tutorial. For more info visit: https://angular.io/guide/testing


6. The 'app.module.ts' and 'app-routing-module.ts' files

   For the 'app.module.ts' and 'app-routing-module.ts' files we have to add the following code for each new instance.

   1. First, we need to add, on the 'app.module.ts' a new module for each element of the CRUD of the instance (in this case: question) that we are going to add.
   Next, we have an example of the CRUD module of questions being added to the 'app.module.ts' file.

   2. Finally, we have add on the 'app-routing.module.ts' file the PATH of the route in the application where we will find the CRUD element of the instance that we need to add, the one that we declared previously on the 'app.module.ts' file.
   The code in this file will look similar to the following:



