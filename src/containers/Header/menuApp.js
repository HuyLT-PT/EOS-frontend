export const adminMenu = [
    { //admin
        name: 'menu.admin.admin', link: '/system/user-manage',
        
        menus: [
            {
                 name: 'menu.admin.user-manage', link: '/system/user-manage' 
            },
             {
                name: 'menu.admin.class-manage',link: '/system/class-manage'
               
            },
           
             {
                name: 'menu.admin.student-exam',link: '/system/student-exam'
               
            },
              {
                name: 'menu.admin.exam-manage',link: '/system/exam-manage'
                
            },
              {
                name: 'menu.admin.profile',link: '/system/profile'
                
            },
        ],

   
    },

    
];

export const studentMenu = [
    { //student
        name: 'menu.student.student',
        menus: [         
             {
                name: 'menu.student.student-exam',link: '/system/student-exam'
               
            },
            {
                name: 'menu.admin.profile',link: '/system/profile'
                
            },
        ]
    },
];
export const teacherMenu = [
    
    { //teacher
        name: 'menu.teacher.teacher',
        menus: [
            {
               name: 'menu.teacher.class-manage',link: '/system/class-manage'
               
            },
            {
                name: 'menu.teacher.student-manage',link :'/system/student-manage'
               
            },
            {
                name: 'menu.teacher.exam-manage',link: '/system/exam-manage'
                
            },
            {
                name: 'menu.admin.profile',link: '/system/profile'
                
            },
        ]
    },
   
];
