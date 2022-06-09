export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.exam-manage', link: '/system/exam-manage' },
                    { name: 'menu.system.system-administrator.class-manage', link: '/system/class-manage' },
                    { name: 'menu.system.system-administrator.student-manage', link: '/system/student-manage' },
                   //  { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                   // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];