<script>
import {Auth} from "aws-amplify";

export default {
    name: 'SidebarItems',
    data() {
        return {
            userGroup: '',
            adminMenu: [
            {
                _name: 'CSidebarNav',
                _children: [
                {
                    _name: 'CSidebarNavItem',
                    name: this.$t("dashboard"),
                    to: '/dashboard',
                    icon: 'cil-speedometer',
                },
                {
                    _name: 'CSidebarNavItem',
                   name: this.$t("moorings"),
                    to: '/moorings',
                    icon: 'cil-list',
                },
                {
                    _name: 'CSidebarNavItem',
                   name: this.$t("orders"),
                    to: '/orders',
                    icon: 'cil-list',
                },
                {
                    _name: 'CSidebarNavItem',
                    name: this.$t("camera"),
                    to: '/camera',
                    icon: 'cil-image',
                },
                    {
                    _name: 'CSidebarNavItem',
                    name: this.$t("forum"),
                    to: '/forum',
                    icon: 'cil-puzzle',
                    badge: {
                        color: 'primary',
                         text:  this.$t("NEW"),
                    }
                },
                ]
            }
            ],
            userMenu: [
                        {
                            _name: 'CSidebarNav',
                            _children: [
                            {
                                _name: 'CSidebarNavItem',
                                name: this.$t("dashboard"),
                                to: '/dashboard',
                                icon: 'cil-speedometer',
                            },
                            {
                    _name: 'CSidebarNavItem',
                    name: this.$t("moorings"),
                    to: '/moorings',
                    icon: 'cil-list',
                },
                {
                    _name: 'CSidebarNavItem',
                    name: this.$t("camera"),
                    to: '/camera',
                    icon: 'cil-image',
                },
                                {
                                _name: 'CSidebarNavItem',
                                name: this.$t("forum"),
                                to: '/forum',
                                icon: 'cil-puzzle',
                                badge: {
                                    color: 'primary',
                                    text:  this.$t("NEW"),
                                }
                            },
                            ]
                        }
                        ],
        
    }},

    computed: {
        sidebarItems() {
            if (this.userGroup === 'ADMIN') {
                return this.adminMenu
            }
            return this.userMenu
        }
    },

    created() {
        Auth.currentSession()
            .then(data => {
                this.userGroup = data.idToken.payload['cognito:groups'] ? data.idToken.payload['cognito:groups'][0] : 'USER'
            })
    }
}
</script>
