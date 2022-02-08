export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Moorings',
        to: '/moorings',
        icon: 'cil-speedometer',
      },
        {
          _name: 'CSidebarNavItem',
          name: 'Forum',
          to: '/forum',
          icon: 'cil-speedometer',
          badge: {
            color: 'primary',
            text: 'NEW'
          }
      },
    ]
  }
]