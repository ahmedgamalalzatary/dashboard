import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation - single words lowercase
      dashboard: 'Dashboard',
      sales: 'Sales',
      products: 'Products',
      inventory: 'Inventory',
      orders: 'Orders',
      reservation: 'Reservation',
      clients: 'Clients',
      employees: 'Employees',
      events: 'Events',
      reports: 'Reports',
      settings: 'Settings',
      support: 'Support',
      faq: 'FAQ',

      // Common - single words lowercase
      search: 'Search anything...',
      viewAll: 'View All',
      cancel: 'Cancel',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      close: 'Close',
      id: 'ID',
      product: 'Product',
      actions: 'Actions',
      date: 'Date',
      amount: 'Amount',
      growth: 'Growth',
      name: 'Name',
      stock: 'Stock',
      price: 'Price',
      left: 'left',
      products: 'products',
      Previous: 'Previous',
      Next: 'Next',
      Showing: 'Showing',
      of: 'of',

      // Multi-word phrases - CamelCase starting with capital
      TotalSales: 'Total Sales',
      TotalOrders: 'Total Orders',
      NewClients: 'New Clients',
      OrdersTrend: 'Orders Trend',
      RecentTransactions: 'Recent Transactions',
      QuickActions: 'Quick Actions',
      GoalsProgress: 'Goals Progress',
      UpcomingTasks: 'Upcoming Tasks',
      RecentActivity: 'Recent Activity',
      NewSale: 'New Sale',
      AddNewSale: 'Add New Sale',
      CustomerName: 'Customer Name',
      PaymentMethods: 'Payment Methods',
      QuickStats: 'Quick Stats',
      OrderStatus: 'Status',
      SalesOverview: 'Sales Overview',
      SalesDistribution: 'Sales Distribution',
      ViewCalendar: 'View Calendar',
      PerformanceMetrics: 'Performance Metrics',
      TotalRevenue: 'Total Revenue',

      // Namespaces/Objects - Capital first letter
      Sales: {
        RecentOrders: 'Recent Orders',
        TopCustomers: 'Top Customers',
        Orders: 'Orders',
        FilterByDate: 'Filter by date',
        Today: 'Today',
        ThisWeek: 'This Week',
        ThisMonth: 'This Month',
        SearchSales: 'Search sales',
        FilterByProduct: 'Filter by product',
        SalesRecords: 'Sales Records',
        Export: 'Export',
        Showing: 'Showing',
        Of: 'of',
        Entries: 'entries',
        Previous: 'Previous',
        Next: 'Next',
        CreditCard: 'Credit Card',
        BankTransfer: 'Bank Transfer',
        Cash: 'Cash',
        AverageSale: 'Average Sale',
        SalesCount: 'Sales Count',
        TopProduct: 'Top Product',
        NoSalesData: 'No sales data found matching your criteria'
      },
      
      Products: {
        AddProduct: 'Add Product',
        ProductName: 'Product Name',
        TopSelling: 'Top Selling',
        LowStockAlert: 'Low Stock Alert',
        CategoryDistribution: 'Category Distribution',
        ProductA: 'Product A',
        ProductB: 'Product B',
        ProductC: 'Product C'
      },

      Notifications: {
        NewOrder: 'New order received',
        MeetingReminder: 'Meeting reminder',
        StockUpdate: 'Stock update required'
      },

      Crm: {
        Dashboard: 'CRM Dashboard',
        System: 'CRM System',
        MainStats: {
          TotalSales: 'Total Sales',
          TotalOrders: 'Total Orders',
          NewCustomers: 'New Customers',
          Growth: 'Growth'
        },
        ProductsManagement: 'Products Management',
        AddSale: 'Add Sale',
        AddClient: 'Add Client',
        AddNewProduct: 'Add Product'
      },

      Months: {
        Jan: 'January',
        Feb: 'February',
        Mar: 'March',
        Apr: 'April',
        May: 'May',
        Jun: 'June',
        Jul: 'July',
        Aug: 'August',
        Sep: 'September',
        Oct: 'October',
        Nov: 'November',
        Dec: 'December'
      },

      Customers: {
        JohnDoe: 'John Doe',
        JaneSmith: 'Jane Smith',
        BobJohnson: 'Bob Johnson',
        AliceWilliams: 'Alice Williams',
        TomBrown: 'Tom Brown',
        DavidWilson: 'David Wilson'
      },

      Status: {
        Completed: 'Completed',
        Processing: 'Processing',
        Pending: 'Pending',
        Cancelled: 'Cancelled'
      },

      TimeAgo: {
        Min2: '2 minutes ago',
        Min5: '5 minutes ago',
        Min10: '10 minutes ago',
        Min15: '15 minutes ago',
        Hour1: '1 hour ago',
        twohours: '2 hours ago',
        threehours: '3 hours ago',
        Hours5: '5 hours ago',
        oneday: '1 day ago',
        JustNow: 'Just now',
        threedays: '3 days ago',
        fivedays: '5 days ago',
        oneweek: '1 week ago'
      },

      Timeframes: {
        Weekly: 'Weekly',
        Monthly: 'Monthly',
        Yearly: 'Yearly'
      },

      Activities: {
        NewOrder: 'New order received',
        ClientMeeting: 'Client meeting scheduled',
        StockUpdate: 'Stock update completed',
        NewClient: 'New client registered'
      },

      Tasks: {
        ReviewSales: 'Review sales report',
        ClientMeeting: 'Meeting with client',
        UpdateInventory: 'Update inventory',
        TeamSync: 'Team sync',
        Today: 'Today',
        Tomorrow: 'Tomorrow',
        ThisWeek: 'This week',
        Saturday: 'Saturday',
        Sunday: 'Sunday',
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday'
      },

      Goals: {
        Revenue: 'Revenue',
        Sales: 'Sales',
        Customers: 'Customers',
      },

      SalesChannels: {
        Online: 'Online',
        Offline: 'Offline',
        InStore: 'In-store',
        Phone: 'Phone',
        Marketplace: 'Marketplace'
      },

      Categories: {
        All: 'All Products',
        Electronics: 'Electronics',
        Furniture: 'Furniture',
        Clothing: 'Clothing'
      },

      Metrics: {
        ConversionRate: 'Conversion Rate',
        AverageOrder: 'Average Order',
        CustomerRetention: 'Customer Retention',
        ReturnRate: 'Return Rate',
        PerformanceMetrics: 'Performance Metrics'
      },

      Support: {
        NeedAssistance: 'Need Assistance?',
        ContactUs: 'Contact Us',
        CallSupport: 'Call Support',
        ChatSupport: 'Chat Support',
        AvailableMessage: 'We are here to help. Feel free to contact us if you have any inquiries or issues.',
        // Basic page elements
        Title: 'Support Center',
        Description: 'Get help with any aspect of our CRM system',
        
        // Support channels
        Channels: {
          Chat: 'Live Chat',
          Email: 'Email Support',
          Phone: 'Phone Support',
          EmailAddress: 'support@example.com',
          PhoneNumber: '+1 234 567 890',
          Connect: 'Connect',
          Status: {
            Online: 'Online',
            Available: 'Available',
            Support247: '24/7'
          }
        },
        
        // Common issues section
        CommonIssues: 'Common Issues',
        KnowledgeBase: 'Knowledge Base',
        KnowledgeBaseDesc: 'Browse our comprehensive knowledge base for detailed guides and tutorials.',
        VisitKnowledgeBase: 'Visit Knowledge Base',
        
        // Create ticket section
        CreateTicket: 'Create Support Ticket',
        TicketForm: {
          Category: 'Category',
          Subject: 'Subject',
          SubjectPlaceholder: 'Brief description of your issue',
          Description: 'Description',
          DescriptionPlaceholder: 'Provide detailed information about your issue...',
          Priority: 'Priority',
          PriorityLevels: {
            Low: 'Low',
            Medium: 'Medium',
            High: 'High',
            Urgent: 'Urgent'
          },
          Submit: 'Submit Ticket'
        },
        
        // Support status section
        SupportStatus: 'Support Status',
        SystemStatus: 'System Status',
        Operational: 'Operational',
        ResponseTime: 'Average Response Time',
        OneHour: '1 hour',
        Satisfaction: 'Support Satisfaction',
        SatisfactionRate: '97%',
        
        // Recent tickets section
        RecentTickets: 'Recent Tickets',
        ViewAll: 'View All',
        TicketTable: {
          ID: 'ID',
          Subject: 'Subject',
          Status: 'Status',
          Date: 'Date'
        },
        TicketStatuses: {
          InProgress: 'In Progress',
          Resolved: 'Resolved',
          Closed: 'Closed'
        },
        
        // Categories
        Categories: {
          General: 'General Inquiry',
          Technical: 'Technical Issue',
          Billing: 'Billing Problem'
        },
        
        // CTA Banner
        Assistance: 'Need immediate assistance?',
        AssistanceMessage: 'Our support team is available 24/7 to help you with any questions',
        StartChat: 'Start Live Chat',
        CallNow: 'Call Support'
      },

      NotificationMessages: {
        Title: 'Notifications',
        New: 'New',
        ViewAll: 'View All',
        NoNotifications: 'No new notifications',
        AllCaughtUp: 'You\'re all caught up!',
        MarkAllRead: 'Mark all as read',
        Messages: {
          NewOrder: 'New order received',
          StockUpdate: 'Stock update required',
          MeetingReminder: 'Meeting reminder',
        },
        TimeAgo: {
          JustNow: 'Just now',
          MinutesAgo: '{{count}} minutes ago',
          HoursAgo: '{{count}} hours ago',
          DaysAgo: '{{count}} days ago',
        }
      },
      
      currency: '{{value, currency}}',
      SearchProducts: 'Search products...',
      SelectCategory: 'Select Category',
      AllCategories: 'All Categories',
      AddNewProduct: 'Add New Product', 
      NoProductsFound: 'No products found matching your criteria',

      // Inventory specific translations
      Inventory: {
        Title: 'Inventory Management',
        Search: 'Search inventory...',
        SearchInventory: 'Search inventory...',
        AddStock: 'Add Stock',
        RemoveStock: 'Remove Stock',
        AddNewProduct: 'Add New Product',
        CurrentStock: 'Current Stock',
        StockValue: 'Stock Value',
        StockMovement: 'Stock Movement',
        TotalStock: 'Total Stock',
        InTransit: 'In Transit',
        LowStock: 'Low Stock',
        Alerts: 'Alerts',
        LowStockAlerts: 'Low Stock Alerts',
        Actions: 'Inventory Actions',
        ShowTable: 'Show Inventory Table',
        HideTable: 'Hide Inventory Table',
        AllItems: 'All Items',
        Reorder: 'Reorder',
        Current: 'Current',
        Minimum: 'Minimum',
        Quantity: 'Quantity',
        MinQuantity: 'Min Quantity',
        Supplier: 'Supplier',
        Price: '$',
        StockAdjustment: 'Stock Adjustment',
        PurchaseOrder: 'Purchase Order',
        StockTransfer: 'Stock Transfer',
        ScanInventory: 'Scan Inventory',
        ViewHistory: 'View History',
        ExportList: 'Export List',
        Increasing: 'Increasing',
        Decreasing: 'Decreasing',
        Warning: 'Warning',
        ProductId: 'Product ID',
        Status: {
          InStock: 'In Stock',
          LowStock: 'Low Stock',
          OutOfStock: 'Out of Stock',
          MediumStock: 'Medium Stock'
        },
        Sort: {
          NameAZ: 'Name (A-Z)',
          NameZA: 'Name (Z-A)',
          QuantityLowHigh: 'Quantity (Low-High)',
          QuantityHighLow: 'Quantity (High-Low)',
          PriceLowHigh: 'Price (Low-High)',
          PriceHighLow: 'Price (High-Low)'
        },
        to: 'to',
        results: 'results',
        Management: 'Inventory Management',
        QuantityToAdd: 'Quantity to add',
        Notes: 'Notes',
        OptionalNotes: 'Optional notes about this adjustment',
        NoItemsFound: 'No inventory items found matching your criteria',
        LowStockItems: 'Low Stock Items',
        OutOfStockItems: 'Out of Stock Items',
        AllStock: 'All Stock',
        Categories: 'Categories'
      },

      // Orders specific translations
      Orders: {
        Title: 'Orders Management',
        NewOrder: 'New Order',
        Search: 'Search orders...',
        FilterByStatus: 'Filter by status',
        FilterByDate: 'Filter by date',
        Stats: {
          TotalOrders: 'Total Orders',
          Pending: 'Pending',
          Completed: 'Completed',
          Cancelled: 'Cancelled'
        },
        Status: {
          All: 'All Status',
          Pending: 'Pending',
          Processing: 'Processing',
          Completed: 'Completed',
          Cancelled: 'Cancelled'
        },
        TableHeaders: {
          OrderId: 'Order ID',
          Customer: 'Customer',
          Status: 'Status',
          Amount: 'Amount',
          Date: 'Date'
        },
        Filter: 'Filter',
        NoOrders: 'No orders found',
        Management: "Orders Management",
        CreateOrder: "Create Order",
        CreateNewOrder: "Create New Order",
        SelectProduct: "Select Product",
        ShippingAddress: "Shipping Address",
        EnterShippingAddress: "Enter shipping address",
        SearchOrders: "Search orders",
        AllStatuses: "All Statuses",
        NoOrdersFound: "No orders found",
        Items: "orders"
      },

      // Reservation specific translations
      Reservation: {
        Title: 'Reservation Management',
        NewReservation: 'New Reservation',
        Stats: {
          TodayReservations: "Today's Reservations",
          Confirmed: 'Confirmed',
          Pending: 'Pending'
        },
        Filter: {
          Date: 'Date',
          Status: 'Status',
          AllReservations: 'All Reservations',
          Confirmed: 'Confirmed',
          Pending: 'Pending',
          Cancelled: 'Cancelled'
        },
        ViewMode: {
          Cards: 'Cards',
          Table: 'Table'
        },
        NoReservations: 'No reservations found for the selected filters',
        TimeSlots: {
          Title: 'Available Time Slots',
          Booked: 'Booked'
        },
        Form: {
          ClientName: 'Client Name',
          Date: 'Date',
          Time: 'Time',
          People: 'Number of People',
          ContactPhone: 'Contact Phone',
          ContactEmail: 'Contact Email',
          SpecialRequests: 'Special Requests',
          Submit: 'Submit Reservation'
        },
        Table: {
          Client: 'Client',
          Time: 'Time',
          People: 'People',
          Status: 'Status',
          Contact: 'Contact',
          Actions: 'Actions'
        },
        Actions: {
          Edit: 'Edit',
          Cancel: 'Cancel'
        }
      },

      // Clients specific translations
      Clients: {
        Title: 'Client Management',
        AddClient: 'Add Client',
        Search: 'Search clients...',
        ImportClients: 'Import Clients',
        Stats: {
          TotalClients: 'Total Clients',
          PremiumClients: 'Premium Clients',
          RegularClients: 'Regular Clients',
          NewThisMonth: 'New This Month'
        },
        Form: {
          FirstName: 'First Name',
          LastName: 'Last Name',
          Email: 'Email',
          Phone: 'Phone',
          Company: 'Company',
          ClientType: 'Client Type',
          Regular: 'Regular',
          Premium: 'Premium'
        },
        Table: {
          Client: 'Client',
          Contact: 'Contact',
          Company: 'Company',
          Status: 'Status',
          Joined: 'Joined',
          Action: 'Action'
        },
        Details: {
          Title: 'Client Details',
          Email: 'Email',
          Phone: 'Phone',
          Company: 'Company',
          JoinDate: 'Join Date',
          LastOrder: 'Last Order',
          TotalSpent: 'Total Spent',
          EditClient: 'Edit Client',
          Contact: 'Contact'
        },
        NoClients: 'No clients found matching your criteria',
        ClientTypes: {
          All: 'All Client Types',
          Premium: 'Premium Only',
          Regular: 'Regular Only'
        },
        Client: 'Client',
        Showing: 'Showing',
        Of: 'of',
        Clients: 'clients',
        Previous: 'Previous',
        Next: 'Next',
        DetailStats: {
          Title: 'Client Details',
          JoinDate: 'Join Date',
          LastOrder: 'Last Order',
          TotalSpent: 'Total Spent'
        }
      },

      // Employees specific translations
      Employees: {
        Title: 'Employee Management',
        AddEmployee: 'Add Employee',
        Search: 'Search employees...',
        Directory: 'Employee Directory',
        FilterDepartment: 'All Departments',
        Stats: {
          Total: 'Total Employees',
          Active: 'Active',
          OnLeave: 'On Leave'
        },
        Departments: {
          Sales: 'Sales',
          CustomerSupport: 'Customer Support',
          IT: 'IT',
          HR: 'HR',
          Finance: 'Finance',
          Marketing: 'Marketing',
          Product: 'Product'
        },
        Status: {
          Active: 'Active',
          OnLeave: 'On Leave'
        },
        Table: {
          ShowingCount: 'Showing {{filtered}} of {{total}} employees',
          NoResults: 'No employees matching your criteria',
          Position: 'Position',
          Department: 'Department'
        },
        Navigation: {
          Previous: 'Previous',
          Next: 'Next'
        },
        Names: {
          JohnDoe: 'John Doe',
          JaneSmith: 'Jane Smith',
          MikeWilson: 'Mike Wilson',
          SarahJohnson: 'Sarah Johnson',
          RobertDavis: 'Robert Davis'
        },
        // Additional translation keys for the Employees page
        JohnSmith: 'John Smith',
        SarahJohnson: 'Sarah Johnson',
        MichaelBrown: 'Michael Brown',
        EmilyDavis: 'Emily Davis',
        DavidWilson: 'David Wilson',
        Team: 'Team Management',
        AddNew: 'Add New Member',
        AddNewMember: 'Add New Team Member',
        TotalTeam: 'Total Team',
        ActiveMembers: 'Active Members',
        InactiveMembers: 'Inactive Members',
        SearchTeam: 'Search team members...',
        AllDepartments: 'All Departments',
        NoResults: 'No team members found',
        Members: 'members',
        Member: 'member',
        DepartmentDistribution: 'Department Distribution',
        RecentActivity: 'Recent Activity',
        NewMemberJoined: 'New team member joined',
        MemberPromoted: 'Team member promoted',
        MemberLeft: 'Team member left the company',
        Active: 'Active',
        Inactive: 'Inactive',
        email: 'Email',
        phone: 'Phone',
        department: 'Department',
        position: 'Position',
        startDate: 'Start Date',
        status: 'Status',
        SelectDepartment: 'Select Department',
        Positions: {
          Manager: 'Manager',
          Specialist: 'Specialist',
          Developer: 'Developer',
          Director: 'Director',
          Analyst: 'Analyst'
        }
      },

      Events: {
        Title: 'Events Management',
        CreateEvent: 'Create Event',
        Search: 'Search events...',
        FilterTypes: 'All Event Types',
        Stats: {
          TotalEvents: 'Total Events',
          Today: 'Today',
          Upcoming: 'Upcoming',
          Past: 'Past'
        },
        Types: {
          All: 'All Types',
          Corporate: 'Corporate',
          Internal: 'Internal',
          Training: 'Training'
        },
        Table: {
          Event: 'Event',
          Date: 'Date',
          Time: 'Time',
          Attendees: 'Attendees',
          Type: 'Type',
          Location: 'Location',
          Action: 'Action'
        },
        NoEvents: 'No events found matching your criteria',
        Showing: 'Showing {{filtered}} of {{total}} events',
        Actions: {
          Details: 'Details',
          Cancel: 'Cancel',
          Create: 'Create Event',
          Edit: 'Edit Event'
        },
        Form: {
          Title: 'Event Title',
          Date: 'Date',
          Time: 'Time',
          Type: 'Event Type',
          Location: 'Location',
          Attendees: 'Expected Attendees',
          Description: 'Description'
        },
        Calendar: {
          Title: 'Monthly Calendar',
          ViewFull: 'View Full Calendar',
          Sun: 'Sun',
          Mon: 'Mon',
          Tue: 'Tue',
          Wed: 'Wed',
          Thu: 'Thu',
          Fri: 'Fri',
          Sat: 'Sat'
        },
        Schedule: 'Event Schedule',
        Events: {
          ProductLaunch: 'Product Launch',
          TeamMeeting: 'Team Meeting',
          ClientWorkshop: 'Client Workshop',
          SalesConference: 'Sales Conference',
          StaffTraining: 'Staff Training'
        },
        Locations: {
          MainConference: 'Main Conference Room',
          MeetingRoomA: 'Meeting Room A',
          MeetingRoomB: 'Meeting Room B',
          TrainingCenter: 'Training Center'
        },
        NoUpcoming: 'No upcoming events',
        Attendees: '{{count}} attendees',
        Organizer: 'Organizer',
        Admin: 'Admin',
        System: 'System',
        Contact: 'contact@example.com',
        Descriptions: {
          ProductLaunch: 'Introducing our newest product line to key stakeholders and media partners.',
          TeamMeeting: 'Weekly sync meeting to discuss ongoing projects and priorities.',
          ClientWorkshop: 'Training session for client representatives on product usage.',
          SalesConference: 'Annual sales team conference with presentations and strategy sessions.',
          StaffTraining: 'Training session for new staff members on company procedures.'
        }
      },

      Reports: {
        Title: 'Reports & Analytics',
        ExportReports: 'Export Reports',
        Filter: 'Filter',
        Types: {
          Sales: 'Sales Report',
          Product: 'Product Report',
          Customer: 'Customer Report',
          ViewAnalytics: 'View detailed analytics'
        },
        Periods: {
          Weekly: 'Weekly',
          Monthly: 'Monthly',
          Quarterly: 'Quarterly',
          Yearly: 'Yearly'
        },
        Charts: {
          SalesOverview: 'Sales Overview',
          MonthlyPerformance: 'Monthly Performance',
          ProductDistribution: 'Product Distribution',
          TopProducts: 'Top Products',
          CustomerGrowth: 'Customer Growth',
          CustomerDemographics: 'Customer Demographics',
          Download: 'Download Reports',
          SalesReport: 'Sales Report',
          InventoryReport: 'Inventory Report',
          FinancialReport: 'Financial Report',
          ReportDescriptions: {
            Sales: 'Includes all sales transactions',
            Inventory: 'Current stock and product status',
            Financial: 'Revenue, expenses and profit'
          }
        }
      },

      Settings: {
        Title: 'Settings',
        Profile: {
          Title: 'Profile',
          FirstName: 'First Name',
          LastName: 'Last Name',
          Email: 'Email Address',
          Phone: 'Phone Number',
          Bio: 'Bio',
          ChangePhoto: 'Change Photo',
          WriteBio: 'Write a short bio...',
          SaveChanges: 'Save Changes'
        },
        Notifications: {
          Title: 'Notifications',
          Email: 'Email Notifications',
          Push: 'Push Notifications',
          Types: {
            NewOrders: 'New Orders',
            OrderStatus: 'Order Status Change',
            InventoryAlerts: 'Inventory Alerts',
            CustomerSupport: 'Customer Support',
            SystemUpdates: 'System Updates',
            Desktop: 'Desktop Notifications',
            Mobile: 'Mobile Notifications'
          }
        },
        Security: {
          Title: 'Security',
          ChangePassword: 'Change Password',
          CurrentPassword: 'Current Password',
          NewPassword: 'New Password',
          ConfirmPassword: 'Confirm New Password',
          UpdatePassword: 'Update Password',
          TwoFactor: {
            Title: 'Two-Factor Authentication',
            Description: 'Add an extra layer of security to your account',
            Enable: 'Enable'
          }
        },
        Appearance: {
          Title: 'Appearance',
          Theme: {
            Title: 'Theme Preferences',
            DarkMode: 'Dark Mode',
            DarkModeDesc: 'Use dark theme across the application',
            ColorScheme: 'Color Scheme'
          },
          Layout: {
            Title: 'Dashboard Layout',
            CompactView: 'Compact View',
            ExpandedView: 'Expanded View'
          }
        },
        Language: {
          Title: 'Language Settings',
          DateTimeFormat: 'Date & Time Format',
          DateFormat: 'Date Format',
          TimeFormat: 'Time Format',
          TimeZone: 'Time Zone',
          SaveLanguageSettings: 'Save Language Settings',
          Options: {
            DateFormats: {
              US: 'MM/DD/YYYY (US)',
              EU: 'DD/MM/YYYY (EU)',
              ISO: 'YYYY-MM-DD (ISO)'
            },
            TimeFormats: {
              H12: '12-hour (AM/PM)',
              H24: '24-hour'
            },
            TimeZones: {
              Pacific: '(UTC-8:00) Pacific Time',
              Eastern: '(UTC-5:00) Eastern Time',
              London: '(UTC+0:00) London',
              Paris: '(UTC+1:00) Paris, Berlin',
              Moscow: '(UTC+3:00) Moscow'
            }
          }
        },
        Backup: {
          Title: 'Data Backup & Export',
          InfoMessage: 'Regular data backups help protect your business information. We recommend exporting your data at least once a month.',
          Manual: {
            Title: 'Manual Backup',
            Description: 'Export all your data as CSV or Excel files'
          },
          Scheduled: {
            Title: 'Scheduled Backups',
            Description: 'Set up automatic scheduled backups',
            Enable: 'Enable auto backup'
          },
          DataManagement: {
            Title: 'Data Management',
            Import: {
              Title: 'Import Data',
              Description: 'Import data from CSV, Excel or JSON',
              Button: 'Import'
            },
            Delete: {
              Title: 'Delete All Data',
              Description: 'This action cannot be undone',
              Button: 'Delete'
            }
          },
          Frequency: {
            Weekly: 'Weekly',
            Monthly: 'Monthly',
            Quarterly: 'Quarterly'
          }
        },
        QuickSettings: {
          EmailNotifications: 'Email Notifications',
          DarkMode: 'Dark Mode',
          Language: 'Language'
        },
        Tabs: {
          Profile: 'Profile',
          Notifications: 'Notifications',
          Security: 'Security',
          Appearance: 'Appearance',
          Language: 'Language',
          BackupData: 'Backup & Data'
        },
        Languages: {
          English: 'English',
          Spanish: 'Español',
          French: 'Français',
          German: 'Deutsch',
          Arabic: 'العربية',
          Chinese: '中文'
        }
      },

      // FAQ translations
      FAQ: {
        Title: 'Frequently Asked Questions',
        ContactSupport: 'Contact Support',
        SearchPlaceholder: 'Search FAQ...',
        SearchResults: '{{count}} results found',
        ShowingQuestions: 'Showing {{count}} questions',
        NoResultsSearch: 'No FAQs match your search criteria',
        NoQuestionsCategory: 'No FAQs available for this category',
        StillHaveQuestions: 'Still have questions?',
        SupportTeamMessage: 'Our support team is here to help you 24/7',
        LiveChat: 'Live Chat',
        EmailSupport: 'Email Support',
        
        CategoryNames: {
          General: 'General Questions',
          Account: 'Account & Billing',
          Services: 'Services',
          Technical: 'Technical Support'
        },
        
        Categories: {
          General: {
            Q1: 'How do I create a new order?',
            A1: 'To create a new order, go to the Orders page and click on "New Order" button. Fill in the required details like customer information, products, quantities, and payment method. Once completed, click "Submit" to create the order.',
            Q2: 'Can I export my data from the system?',
            A2: 'Yes, most data in the system can be exported. Navigate to the specific page (e.g., Products, Orders) and look for the "Export" button. You can export data in various formats like Excel, CSV, or PDF.'
          },
          Account: {
            Q1: 'How can I reset my password?',
            A1: 'You can reset your password by clicking on "Forgot Password" on the login page. Enter your registered email address and follow the instructions sent to your inbox.',
            Q2: 'What payment methods do you accept?',
            A2: 'We accept credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For recurring subscriptions, we recommend setting up automatic payments.'
          },
          Services: {
            Q1: 'Can I customize my dashboard?',
            A1: 'Yes, you can customize your dashboard by clicking on "Edit Dashboard" in the top-right corner. You can add, remove, or rearrange widgets according to your preferences.',
            Q2: 'How often is data updated?',
            A2: 'Data in the system is updated in real-time. However, some reports and analytics may have a slight delay of up to 15 minutes to ensure accurate calculations.'
          },
          Technical: {
            Q1: 'How can I contact customer support?',
            A1: 'You can reach our customer support through multiple channels: live chat available 24/7, email at support@example.com, or phone at +1-800-123-4567 during business hours (9 AM - 5 PM EST).',
            Q2: 'Is there an API available?',
            A2: 'Yes, we provide a comprehensive API for integrations. You can find the documentation in the Developer section under Settings. API keys can be generated in your account settings.'
          }
        }
      },
      supplier: 'Supplier',
      quantity: 'Quantity',
      total: 'Total',
      category: 'Category',
      email: 'Email',
      phone: 'Phone',
      lastUpdated: 'Last Updated',
      position: 'Position',
      startDate: 'Start Date',
      status: 'Status',
      items: 'items'
    }
  },
  ar: {
    translation: {
      // Navigation - single words lowercase
      dashboard: 'لوحة التحكم',
      sales: 'المبيعات',
      products: 'المنتجات',
      inventory: 'المخزون',
      orders: 'الطلبات',
      reservation: 'الحجوزات',
      clients: 'العملاء',
      employees: 'الموظفون',
      events: 'الفعاليات',
      reports: 'التقارير',
      settings: 'الإعدادات',
      support: 'الدعم',
      faq: 'الأسئلة الشائعة',

      // Common - single words lowercase
      search: 'ابحث عن أي شيء...',
      viewAll: 'عرض الكل',
      cancel: 'إلغاء',
      add: 'إضافة',
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ',
      close: 'إغلاق',
      id: 'المعرف',
      product: 'المنتج',
      actions: 'الإجراءات',
      date: 'التاريخ',
      amount: 'المبلغ',
      growth: 'النمو',
      name: 'الاسم',
      stock: 'المخزون',
      price: 'السعر',
      left: 'متبقي',
      products: 'منتجات',
      Previous: 'السابق',
      Next: 'التالي',
      Showing: 'عرض',
      of: 'من',

      // Multi-word phrases - CamelCase starting with capital
      TotalSales: 'إجمالي المبيعات',
      TotalOrders: 'إجمالي الطلبات',
      NewClients: 'العملاء الجدد',
      OrdersTrend: 'اتجاه الطلبات',
      RecentTransactions: 'المعاملات الأخيرة',
      QuickActions: 'إجراءات سريعة',
      GoalsProgress: 'تقدم الأهداف',
      UpcomingTasks: 'المهام القادمة',
      RecentActivity: 'النشاط الأخير',
      NewSale: 'بيع جديد',
      AddNewSale: 'إضافة بيع جديد',
      CustomerName: 'اسم العميل',
      PaymentMethods: 'طرق الدفع',
      QuickStats: 'إحصائيات سريعة',
      OrderStatus: 'الحالة',
      SalesOverview: 'نظرة عامة على المبيعات',
      SalesDistribution: 'توزيع المبيعات',
      ViewCalendar: 'عرض التقويم',
      PerformanceMetrics: 'مؤشرات الأداء',
      TotalRevenue: 'إجمالي الإيرادات',

      // Namespaces/Objects - Capital first letter
      Sales: {
        RecentOrders: 'الطلبات الأخيرة',
        TopCustomers: 'كبار العملاء',
        Orders: 'الطلبات',
        FilterByDate: 'تصفية حسب التاريخ',
        Today: 'اليوم',
        ThisWeek: 'هذا الأسبوع',
        ThisMonth: 'هذا الشهر',
        SearchSales: 'البحث في المبيعات',
        FilterByProduct: 'تصفية حسب المنتج',
        SalesRecords: 'سجلات المبيعات',
        Export: 'تصدير',
        Showing: 'عرض',
        Of: 'من',
        Entries: 'إدخالات',
        Previous: 'السابق',
        Next: 'التالي',
        CreditCard: 'بطاقة ائتمان',
        BankTransfer: 'تحويل بنكي',
        Cash: 'نقدًا',
        AverageSale: 'متوسط المبيعات',
        SalesCount: 'عدد المبيعات',
        TopProduct: 'المنتج الأفضل',
        NoSalesData: 'لم يتم العثور على بيانات مبيعات تطابق معاييرك'
      },
      
      Products: {
        AddProduct: 'إضافة منتج',
        ProductName: 'اسم المنتج',
        TopSelling: 'الأكثر مبيعاً',
        LowStockAlert: 'تنبيه المخزون المنخفض',
        CategoryDistribution: 'توزيع الفئات',
        ProductA: 'المنتج أ',
        ProductB: 'المنتج ب',
        ProductC: 'المنتج ج'
      },

      Notifications: {
        NewOrder: 'تم استلام طلب جديد',
        MeetingReminder: 'تذكير بالاجتماع',
        StockUpdate: 'تحديث المخزون مطلوب'
      },

      Crm: {
        Dashboard: 'نظام إدارة العملاء',
        System: 'نظام إدارة العملاء',
        MainStats: {
          TotalSales: 'إجمالي المبيعات',
          TotalOrders: 'إجمالي الطلبات',
          NewCustomers: 'العملاء الجدد',
          Growth: 'النمو'
        },
        ProductsManagement: 'إدارة المنتجات',
        AddSale: 'إضافة بيع',
        AddClient: 'إضافة عميل',
        AddNewProduct: 'إضافة منتج'
      },

      Months: {
        Jan: 'يناير',
        Feb: 'فبراير',
        Mar: 'مارس',
        Apr: 'أبريل',
        May: 'مايو',
        Jun: 'يونيو',
        Jul: 'يوليو',
        Aug: 'أغسطس',
        Sep: 'سبتمبر',
        Oct: 'أكتوبر',
        Nov: 'نوفمبر',
        Dec: 'ديسمبر'
      },

      Customers: {
        JohnDoe: 'جون دو',
        JaneSmith: 'جين سميث',
        BobJohnson: 'بوب جونسون',
        AliceWilliams: 'أليس ويليامز',
        TomBrown: 'توم براون',
        DavidWilson: 'ديفيد ويلسون'
      },

      Status: {
        Completed: 'مكتمل',
        Processing: 'قيد المعالجة',
        Pending: 'معلق',
        Cancelled: 'ملغي'
      },

      TimeAgo: {
        Min2: 'منذ دقيقتين',
        Min5: 'منذ 5 دقائق',
        Min10: 'منذ 10 دقائق',
        Min15: 'منذ 15 دقائق',
        Hour1: 'منذ 1 ساعة',
        twohours: 'منذ 2 ساعات',
        threehours: 'منذ 3 ساعات',
        fivehours: 'منذ 5 ساعات',
        oneday: 'منذ يوم',
        JustNow: 'الآن',
        threedays: 'منذ 3 أيام',
        fivedays: 'منذ 5 أيام',
        oneweek: 'منذ أسبوع'
      },

      Timeframes: {
        Weekly: 'أسبوعياً',
        Monthly: 'شهري',
        Yearly: 'سنوي'
      },

      Activities: {
        NewOrder: 'تم استلام طلب جديد',
        ClientMeeting: 'تم جدولة اجتماع مع العميل',
        StockUpdate: 'تم تحديث المخزون',
        NewClient: 'تم تسجيل عميل جديد'
      },

      Tasks: {
        ReviewSales: 'مراجعة تقرير المبيعات',
        ClientMeeting: 'اجتماع مع العميل',
        UpdateInventory: 'تحديث المخزون',
        TeamSync: 'مزامنة الفريق',
        Today: 'اليوم',
        Tomorrow: 'غدا',
        ThisWeek: 'هذا الأسبوع',
        Saturday: 'السبت',
        Sunday: 'الأحد',
        Monday: 'الأثنين',
        Tuesday: 'الثلاثاء',
        Wednesday: 'الأربعاء',
        Thursday: 'الخميس',
        Friday: 'الجمعة',
      },

      Goals: {
        Revenue: 'الإيرادات',
        Customers: 'العملاء',
        Sales: 'المبيعات',
      },

      SalesChannels: {
        Online: 'عبر الإنترنت',
        Offline: 'خارج الإنترنت',
        InStore: 'في المتجر',
        Phone: 'الهاتف',
        Marketplace: 'منصات البيع'
      },

      Categories: {
        All: 'جميع المنتجات',
        Electronics: 'إلكترونيات',
        Furniture: 'أثاث',
        Clothing: 'ملابس'
      },

      Metrics: {
        ConversionRate: 'معدل التحويل',
        AverageOrder: 'الطلب المتوسط',
        CustomerRetention: 'الاحتفاظ بالعملاء',
        ReturnRate: 'معدل الإرجاع',
        PerformanceMetrics: 'مقاييس الأداء'
      },

      Support: {
        NeedAssistance: 'هل تحتاج إلى مساعدة؟',
        AvailableMessage: 'نحن هنا لمساعدتك. لا تتردد في الاتصال بنا إذا كان لديك أي استفسارات أو مشاكل.',
        ChatSupport: 'الدعم عبر الدردشة',
        CallSupport: 'الدعم عبر الهاتف',
        // Basic page elements
        Title: 'مركز الدعم',
        Description: 'احصل على المساعدة في أي جانب من نظام إدارة علاقات العملاء لدينا',
        
        // Support channels
        Channels: {
          Chat: 'دردشة مباشرة',
          Email: 'دعم البريد الإلكتروني',
          Phone: 'دعم الهاتف',
          EmailAddress: 'support@example.com',
          PhoneNumber: '+1 234 567 890',
          Connect: 'اتصال',
          Status: {
            Online: 'متصل',
            Available: 'متاح',
            Support247: 'دعم على مدار الساعة'
          }
        },
        
        // Common issues section
        CommonIssues: 'المشكلات الشائعة',
        KnowledgeBase: 'قاعدة المعرفة',
        KnowledgeBaseDesc: 'تصفح قاعدة المعرفة الشاملة للحصول على أدلة وبرامج تعليمية مفصلة.',
        VisitKnowledgeBase: 'زيارة قاعدة المعرفة',
        
        // Create ticket section
        CreateTicket: 'إنشاء تذكرة دعم',
        TicketForm: {
          Category: 'الفئة',
          Subject: 'الموضوع',
          SubjectPlaceholder: 'وصف موجز لمشكلتك',
          Description: 'الوصف',
          DescriptionPlaceholder: 'قدم معلومات مفصلة عن مشكلتك...',
          Priority: 'الأولوية',
          PriorityLevels: {
            Low: 'منخفضة',
            Medium: 'متوسطة',
            High: 'عالية',
            Urgent: 'عاجلة'
          },
          Submit: 'إرسال التذكرة'
        },
        
        // Support status section
        SupportStatus: 'حالة الدعم',
        SystemStatus: 'حالة النظام',
        Operational: 'قيد التشغيل',
        ResponseTime: 'متوسط وقت الاستجابة',
        OneHour: 'ساعة واحدة',
        Satisfaction: 'رضا العملاء عن الدعم',
        SatisfactionRate: '97%',
        
        // Recent tickets section
        RecentTickets: 'التذاكر الأخيرة',
        ViewAll: 'عرض الكل',
        TicketTable: {
          ID: 'المعرف',
          Subject: 'الموضوع',
          Status: 'الحالة',
          Date: 'التاريخ'
        },
        TicketStatuses: {
          InProgress: 'قيد التنفيذ',
          Resolved: 'تم الحل',
          Closed: 'مغلق'
        },
        
        // Categories
        Categories: {
          General: 'استفسار عام',
          Technical: 'مشكلة تقنية',
          Billing: 'مشكلة في الفواتير'
        },
        
        // CTA Banner
        Assistance: 'هل تحتاج إلى مساعدة فورية؟',
        AssistanceMessage: 'فريق الدعم الخاص بنا متاح على مدار 24 ساعة لمساعدتك في أي استفسارات',
        StartChat: 'بدء الدردشة المباشرة',
        CallNow: 'اتصل بالدعم'
      },

      NotificationMessages: {
        Title: 'الإشعارات',
        New: 'جديد',
        ViewAll: 'عرض الكل',
        NoNotifications: 'لا توجد إشعارات جديدة',
        AllCaughtUp: 'أنت على اطلاع بكل شيء!',
        MarkAllRead: 'تعيين الكل كمقروء',
        Messages: {
          NewOrder: 'تم استلام طلب جديد',
          StockUpdate: 'تحديث المخزون مطلوب',
          MeetingReminder: 'تذكير بالاجتماع',
        },
        TimeAgo: {
          JustNow: 'الآن',
          MinutesAgo: 'منذ {{count}} دقائق',
          HoursAgo: 'منذ {{count}} ساعات',
          DaysAgo: 'منذ {{count}} أيام',
        }
      },
      
      currency: '{{value}} ريال',
      SearchProducts: 'بحث عن منتجات...',
      SelectCategory: 'اختر الفئة',
      AllCategories: 'جميع الفئات',
      AddNewProduct: 'إضافة منتج جديد',
      NoProductsFound: 'لم يتم العثور على منتجات تطابق معاييرك',

      // Inventory specific translations
      Inventory: {
        Title: 'إدارة المخزون',
        Search: 'بحث في المخزون...',
        SearchInventory: 'بحث في المخزون...',
        AddStock: 'إضافة مخزون',
        RemoveStock: 'إزالة مخزون',
        AddNewProduct: 'إضافة منتج جديد',
        CurrentStock: 'المخزون الحالي',
        StockValue: 'قيمة المخزون',
        StockMovement: 'حركة المخزون',
        TotalStock: 'إجمالي المخزون',
        InTransit: 'في الطريق',
        LowStock: 'مخزون منخفض',
        Alerts: 'تنبيهات',
        LowStockAlerts: 'تنبيهات المخزون المنخفض',
        Actions: 'إجراءات المخزون',
        ShowTable: 'عرض جدول المخزون',
        HideTable: 'إخفاء جدول المخزون',
        AllItems: 'جميع العناصر',
        Reorder: 'إعادة الطلب',
        Current: 'الحالي',
        Minimum: 'الحد الأدنى',
        Quantity: 'الكمية',
        MinQuantity: 'الحد الأدنى للكمية',
        Supplier: 'المورد',
        Price: 'ريال',
        StockAdjustment: 'تعديل المخزون',
        PurchaseOrder: 'طلب شراء',
        StockTransfer: 'نقل المخزون',
        ScanInventory: 'مسح المخزون',
        ViewHistory: 'عرض التاريخ',
        ExportList: 'تصدير القائمة',
        Increasing: 'متزايد',
        Decreasing: 'متناقص',
        Warning: 'تحذير',
        ProductId: 'رقم المنتج',
        Status: {
          InStock: 'متوفر',
          LowStock: 'مخزون منخفض',
          OutOfStock: 'غير متوفر',
          MediumStock: 'مخزون متوسط'
        },
        Sort: {
          NameAZ: 'الاسم (أ-ي)',
          NameZA: 'الاسم (ي-أ)',
          QuantityLowHigh: 'الكمية (قليل-كثير)',
          QuantityHighLow: 'الكمية (كثير-قليل)',
          PriceLowHigh: 'السعر (قليل-كثير)',
          PriceHighLow: 'السعر (كثير-قليل)'
        },
        to: 'إلى',
        results: 'نتيجة',
        Management: 'إدارة المخزون',
        QuantityToAdd: 'الكمية المضافة',
        Notes: 'ملاحظات',
        OptionalNotes: 'ملاحظات اختيارية عن هذا التعديل',
        NoItemsFound: 'لم يتم العثور على عناصر مخزون مطابقة للمعايير',
        LowStockItems: 'عناصر مخزون منخفض',
        OutOfStockItems: 'عناصر نفذت من المخزون',
        AllStock: 'جميع المخزون',
        Categories: 'الفئات'
      },

      // Orders specific translations
      Orders: {
        Title: 'إدارة الطلبات',
        NewOrder: 'طلب جديد',
        Search: 'البحث في الطلبات...',
        FilterByStatus: 'تصفية حسب الحالة',
        FilterByDate: 'تصفية حسب التاريخ',
        Stats: {
          TotalOrders: 'إجمالي الطلبات',
          Pending: 'قيد الانتظار',
          Completed: 'مكتملة',
          Cancelled: 'ملغاة'
        },
        Status: {
          All: 'جميع الحالات',
          Pending: 'قيد الانتظار',
          Processing: 'قيد المعالجة',
          Completed: 'مكتمل',
          Cancelled: 'ملغي'
        },
        TableHeaders: {
          OrderId: 'رقم الطلب',
          Customer: 'العميل',
          Status: 'الحالة',
          Amount: 'المبلغ',
          Date: 'التاريخ'
        },
        Filter: 'تصفية',
        NoOrders: 'لم يتم العثور على طلبات',
        Management: "إدارة الطلبات",
        CreateOrder: "إنشاء طلب",
        CreateNewOrder: "إنشاء طلب جديد",
        SelectProduct: "اختر المنتج",
        ShippingAddress: "عنوان الشحن",
        EnterShippingAddress: "أدخل عنوان الشحن",
        SearchOrders: "البحث عن الطلبات",
        AllStatuses: "جميع الحالات",
        NoOrdersFound: "لم يتم العثور على طلبات",
        Items: "طلبات"
      },

      // Reservation specific translations
      Reservation: {
        Title: 'إدارة الحجوزات',
        NewReservation: 'حجز جديد',
        Stats: {
          TodayReservations: 'حجوزات اليوم',
          Confirmed: 'مؤكدة',
          Pending: 'قيد الانتظار'
        },
        Filter: {
          Date: 'التاريخ',
          Status: 'الحالة',
          AllReservations: 'جميع الحجوزات',
          Confirmed: 'مؤكدة',
          Pending: 'قيد الانتظار',
          Cancelled: 'ملغية'
        },
        ViewMode: {
          Cards: 'بطاقات',
          Table: 'جدول'
        },
        NoReservations: 'لم يتم العثور على حجوزات للفلاتر المحددة',
        TimeSlots: {
          Title: 'الأوقات المتاحة',
          Booked: 'محجوز'
        },
        Form: {
          ClientName: 'اسم العميل',
          Date: 'التاريخ',
          Time: 'الوقت',
          People: 'عدد الأشخاص',
          ContactPhone: 'رقم الهاتف',
          ContactEmail: 'البريد الإلكتروني',
          SpecialRequests: 'طلبات خاصة',
          Submit: 'تأكيد الحجز'
        },
        Table: {
          Client: 'العميل',
          Time: 'الوقت',
          People: 'الأشخاص',
          Status: 'الحالة',
          Contact: 'معلومات الاتصال',
          Actions: 'الإجراءات'
        },
        Actions: {
          Edit: 'تعديل',
          Cancel: 'إلغاء'
        }
      },

      // Clients specific translations
      Clients: {
        Title: 'إدارة العملاء',
        AddClient: 'إضافة عميل',
        Search: 'بحث عن العملاء...',
        ImportClients: 'استيراد العملاء',
        Stats: {
          TotalClients: 'إجمالي العملاء',
          PremiumClients: 'العملاء المميزون',
          RegularClients: 'العملاء العاديون',
          NewThisMonth: 'جديد هذا الشهر'
        },
        Form: {
          FirstName: 'الاسم الأول',
          LastName: 'اسم العائلة',
          Email: 'البريد الإلكتروني',
          Phone: 'رقم الهاتف',
          Company: 'الشركة',
          ClientType: 'نوع العميل',
          Regular: 'عادي',
          Premium: 'مميز'
        },
        Table: {
          Client: 'العميل',
          Contact: 'معلومات الاتصال',
          Company: 'الشركة',
          Status: 'الحالة',
          Joined: 'تاريخ الانضمام',
          Action: 'الإجراءات'
        },
        Details: {
          Title: 'تفاصيل العميل',
          Email: 'البريد الإلكتروني',
          Phone: 'رقم الهاتف',
          Company: 'الشركة',
          JoinDate: 'تاريخ الانضمام',
          LastOrder: 'آخر طلب',
          TotalSpent: 'إجمالي الإنفاق',
          EditClient: 'تعديل العميل',
          Contact: 'اتصال'
        },
        NoClients: 'لم يتم العثور على عملاء مطابقين لمعايير البحث',
        ClientTypes: {
          All: 'جميع أنواع العملاء',
          Premium: 'العملاء المميزون فقط',
          Regular: 'العملاء العاديون فقط'
        },
        Client: 'العميل',
        Showing: 'عرض',
        Of: 'من',
        Clients: 'عملاء',
        Previous: 'السابق',
        Next: 'التالي',
        DetailStats: {
          Title: 'تفاصيل العميل',
          JoinDate: 'تاريخ الانضمام',
          LastOrder: 'آخر طلب',
          TotalSpent: 'إجمالي الإنفاق'
        }
      },

      // Employees specific translations
      Employees: {
        Title: 'إدارة الموظفين',
        AddEmployee: 'إضافة موظف',
        Search: 'البحث عن موظفين...',
        Directory: 'دليل الموظفين',
        FilterDepartment: 'جميع الأقسام',
        Stats: {
          Total: 'إجمالي الموظفين',
          Active: 'نشط',
          OnLeave: 'في إجازة'
        },
        Departments: {
          Sales: 'المبيعات',
          CustomerSupport: 'دعم العملاء',
          IT: 'تقنية المعلومات',
          HR: 'الموارد البشرية',
          Finance: 'المالية',
          Marketing: 'التسويق',
          Product: 'المنتج'
        },
        Status: {
          Active: 'نشط',
          OnLeave: 'في إجازة'
        },
        Table: {
          ShowingCount: 'عرض {{filtered}} من {{total}} موظف',
          NoResults: 'لا يوجد موظفين مطابقين للمعايير',
          Position: 'المنصب',
          Department: 'القسم'
        },
        Navigation: {
          Previous: 'السابق',
          Next: 'التالي'
        },
        Names: {
          JohnDoe: 'جون دو',
          JaneSmith: 'جين سميث',
          MikeWilson: 'مايك ويلسون',
          SarahJohnson: 'سارة جونسون',
          RobertDavis: 'روبرت دافيس'
        },
        // Additional translation keys for the Employees page in Arabic
        JohnSmith: 'جون سميث',
        SarahJohnson: 'سارة جونسون',
        MichaelBrown: 'مايكل براون',
        EmilyDavis: 'إيميلي دافيس',
        DavidWilson: 'ديفيد ويلسون',
        Team: 'إدارة الفريق',
        AddNew: 'إضافة عضو جديد',
        AddNewMember: 'إضافة عضو فريق جديد',
        TotalTeam: 'إجمالي الفريق',
        ActiveMembers: 'الأعضاء النشطون',
        InactiveMembers: 'الأعضاء غير النشطين',
        SearchTeam: 'البحث عن أعضاء الفريق...',
        AllDepartments: 'جميع الأقسام',
        NoResults: 'لم يتم العثور على أعضاء الفريق',
        Members: 'أعضاء',
        Member: 'عضو',
        DepartmentDistribution: 'توزيع الأقسام',
        RecentActivity: 'النشاط الأخير',
        NewMemberJoined: 'انضم عضو جديد إلى الفريق',
        MemberPromoted: 'تمت ترقية عضو الفريق',
        MemberLeft: 'غادر عضو الفريق الشركة',
        Active: 'نشط',
        Inactive: 'غير نشط',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        department: 'القسم',
        position: 'المنصب',
        startDate: 'تاريخ البدء',
        status: 'الحالة',
        SelectDepartment: 'اختر القسم',
        Positions: {
          Manager: 'مدير',
          Specialist: 'متخصص',
          Developer: 'مطور',
          Director: 'مدير تنفيذي',
          Analyst: 'محلل'
        }
      },

      Events: {
        Title: 'إدارة الفعاليات',
        CreateEvent: 'إنشاء فعالية',
        Search: 'البحث عن الفعاليات...',
        FilterTypes: 'جميع أنواع الفعاليات',
        Stats: {
          TotalEvents: 'إجمالي الفعاليات',
          Today: 'اليوم',
          Upcoming: 'القادمة',
          Past: 'السابقة'
        },
        Types: {
          All: 'جميع الأنواع',
          Corporate: 'الشركات',
          Internal: 'داخلي',
          Training: 'تدريب'
        },
        Table: {
          Event: 'الفعالية',
          Date: 'التاريخ',
          Time: 'الوقت',
          Attendees: 'الحضور',
          Type: 'النوع',
          Location: 'الموقع',
          Action: 'الإجراء'
        },
        NoEvents: 'لم يتم العثور على فعاليات مطابقة للمعايير',
        Showing: 'عرض {{filtered}} من {{total}} فعالية',
        Actions: {
          Details: 'التفاصيل',
          Cancel: 'إلغاء',
          Create: 'إنشاء فعالية',
          Edit: 'تعديل الفعالية'
        },
        Form: {
          Title: 'عنوان الفعالية',
          Date: 'التاريخ',
          Time: 'الوقت',
          Type: 'نوع الفعالية',
          Location: 'الموقع',
          Attendees: 'الحضور المتوقع',
          Description: 'الوصف'
        },
        Calendar: {
          Title: 'التقويم الشهري',
          ViewFull: 'عرض التقويم الكامل',
          Sun: 'الأحد',
          Mon: 'الإثنين',
          Tue: 'الثلاثاء',
          Wed: 'الأربعاء',
          Thu: 'الخميس',
          Fri: 'الجمعة',
          Sat: 'السبت'
        },
        Schedule: 'جدول الفعاليات',
        Events: {
          ProductLaunch: 'إطلاق منتج',
          TeamMeeting: 'اجتماع الفريق',
          ClientWorkshop: 'ورشة عمل العميل',
          SalesConference: 'مؤتمر المبيعات',
          StaffTraining: 'تدريب الموظفين'
        },
        Locations: {
          MainConference: 'قاعة المؤتمرات الرئيسية',
          MeetingRoomA: 'غرفة الاجتماعات أ',
          MeetingRoomB: 'غرفة الاجتماعات ب',
          TrainingCenter: 'مركز التدريب'
        },
        NoUpcoming: 'لا توجد فعاليات قادمة',
        Attendees: '{{count}} حاضر',
        Organizer: 'المنظم',
        Admin: 'مدير',
        System: 'النظام',
        Contact: 'contact@example.com',
        Descriptions: {
          ProductLaunch: 'تقديم خط منتجاتنا الجديد لأصحاب المصلحة الرئيسيين وشركاء الإعلام.',
          TeamMeeting: 'اجتماع أسبوعي لمناقشة المشاريع والأولويات الجارية.',
          ClientWorkshop: 'جلسة تدريبية لممثلي العملاء حول استخدام المنتج.',
          SalesConference: 'مؤتمر فريق المبيعات السنوي مع العروض التقديمية وجلسات الاستراتيجية.',
          StaffTraining: 'جلسة تدريبية للموظفين الجدد حول إجراءات الشركة.'
        }
      },

      Reports: {
        Title: 'التقارير والتحليلات',
        ExportReports: 'تصدير التقارير',
        Filter: 'تصفية',
        Types: {
          Sales: 'تقرير المبيعات',
          Product: 'تقرير المنتجات',
          Customer: 'تقرير العملاء',
          ViewAnalytics: 'عرض التحليلات التفصيلية'
        },
        Periods: {
          Weekly: 'أسبوعي',
          Monthly: 'شهري',
          Quarterly: 'ربع سنوي',
          Yearly: 'سنوي'
        },
        Charts: {
          SalesOverview: 'نظرة عامة على المبيعات',
          MonthlyPerformance: 'الأداء الشهري',
          ProductDistribution: 'توزيع المنتجات',
          TopProducts: 'أفضل المنتجات',
          CustomerGrowth: 'نمو العملاء',
          CustomerDemographics: 'الخصائص الديموغرافية للعملاء',
          Download: 'تنزيل التقارير',
          SalesReport: 'تقرير المبيعات',
          InventoryReport: 'تقرير المخزون',
          FinancialReport: 'التقرير المالي',
          ReportDescriptions: {
            Sales: 'يشمل جميع معاملات المبيعات',
            Inventory: 'المخزون الحالي وحالة المنتج',
            Financial: 'الإيرادات والمصروفات والأرباح'
          }
        }
      },

      Settings: {
        Title: 'الإعدادات',
        Profile: {
          Title: 'الملف الشخصي',
          FirstName: 'الاسم الأول',
          LastName: 'اسم العائلة',
          Email: 'البريد الإلكتروني',
          Phone: 'رقم الهاتف',
          Bio: 'السيرة الذاتية',
          ChangePhoto: 'تغيير الصورة',
          WriteBio: 'اكتب نبذة مختصرة...',
          SaveChanges: 'حفظ التغييرات'
        },
        Notifications: {
          Title: 'الإشعارات',
          Email: 'إشعارات البريد الإلكتروني',
          Push: 'الإشعارات المباشرة',
          Types: {
            NewOrders: 'طلبات جديدة',
            OrderStatus: 'تغيير حالة الطلب',
            InventoryAlerts: 'تنبيهات المخزون',
            CustomerSupport: 'دعم العملاء',
            SystemUpdates: 'تحديثات النظام',
            Desktop: 'إشعارات سطح المكتب',
            Mobile: 'إشعارات الجوال'
          }
        },
        Security: {
          Title: 'الأمان',
          ChangePassword: 'تغيير كلمة المرور',
          CurrentPassword: 'كلمة المرور الحالية',
          NewPassword: 'كلمة المرور الجديدة',
          ConfirmPassword: 'تأكيد كلمة المرور الجديدة',
          UpdatePassword: 'تحديث كلمة المرور',
          TwoFactor: {
            Title: 'المصادقة الثنائية',
            Description: 'إضافة طبقة إضافية من الأمان لحسابك',
            Enable: 'تفعيل'
          }
        },
        Appearance: {
          Title: 'المظهر',
          Theme: {
            Title: 'تفضيلات السمة',
            DarkMode: 'الوضع الداكن',
            DarkModeDesc: 'استخدم السمة الداكنة في جميع أنحاء التطبيق',
            ColorScheme: 'مخطط الألوان'
          },
          Layout: {
            Title: 'تخطيط لوحة التحكم',
            CompactView: 'عرض مضغوط',
            ExpandedView: 'عرض موسع'
          }
        },
        Language: {
          Title: 'إعدادات اللغة',
          DateTimeFormat: 'تنسيق التاريخ والوقت',
          DateFormat: 'تنسيق التاريخ',
          TimeFormat: 'تنسيق الوقت',
          TimeZone: 'المنطقة الزمنية',
          SaveLanguageSettings: 'حفظ إعدادات اللغة',
          Options: {
            DateFormats: {
              US: 'شهر/يوم/سنة (أمريكي)',
              EU: 'يوم/شهر/سنة (أوروبي)',
              ISO: 'سنة-شهر-يوم (ISO)'
            },
            TimeFormats: {
              H12: 'نظام 12 ساعة (صباحًا/مساءً)',
              H24: 'نظام 24 ساعة'
            },
            TimeZones: {
              Pacific: '(UTC-8:00) توقيت المحيط الهادئ',
              Eastern: '(UTC-5:00) التوقيت الشرقي',
              London: '(UTC+0:00) لندن',
              Paris: '(UTC+1:00) باريس، برلين',
              Moscow: '(UTC+3:00) موسكو'
            }
          }
        },
        Backup: {
          Title: 'النسخ الاحتياطي واستخراج البيانات',
          InfoMessage: 'تساعد النسخ الاحتياطية المنتظمة للبيانات في حماية معلومات عملك. نوصي بتصدير بياناتك مرة واحدة على الأقل شهريًا.',
          Manual: {
            Title: 'النسخ الاحتياطي اليدوي',
            Description: 'تصدير جميع بياناتك كملفات CSV أو Excel'
          },
          Scheduled: {
            Title: 'نسخ احتياطي مجدول',
            Description: 'إعداد نسخ احتياطي تلقائي مجدول',
            Enable: 'تمكين النسخ الاحتياطي التلقائي'
          },
          DataManagement: {
            Title: 'إدارة البيانات',
            Import: {
              Title: 'استيراد البيانات',
              Description: 'استيراد البيانات من CSV أو Excel أو JSON',
              Button: 'استيراد'
            },
            Delete: {
              Title: 'حذف جميع البيانات',
              Description: 'لا يمكن التراجع عن هذا الإجراء',
              Button: 'حذف'
            }
          },
          Frequency: {
            Weekly: 'أسبوعي',
            Monthly: 'شهري',
            Quarterly: 'ربع سنوي'
          }
        },
        QuickSettings: {
          EmailNotifications: 'إشعارات البريد الإلكتروني',
          DarkMode: 'الوضع الداكن',
          Language: 'اللغة'
        },
        Tabs: {
          Profile: 'الملف الشخصي',
          Notifications: 'الإشعارات',
          Security: 'الأمان',
          Appearance: 'المظهر',
          Language: 'اللغة',
          BackupData: 'النسخ الاحتياطي والبيانات'
        },
        Languages: {
          English: 'الإنجليزية',
          Spanish: 'الإسبانية',
          French: 'الفرنسية',
          German: 'الألمانية',
          Arabic: 'العربية',
          Chinese: 'الصينية'
        }
      },

      // FAQ translations in Arabic
      FAQ: {
        Title: 'الأسئلة الشائعة',
        ContactSupport: 'اتصل بالدعم',
        SearchPlaceholder: 'ابحث في الأسئلة الشائعة...',
        SearchResults: 'تم العثور على {{count}} نتيجة',
        ShowingQuestions: 'عرض {{count}} أسئلة',
        NoResultsSearch: 'لا توجد أسئلة مطابقة لمعايير البحث',
        NoQuestionsCategory: 'لا توجد أسئلة متاحة لهذه الفئة',
        StillHaveQuestions: 'هل لا تزال لديك أسئلة؟',
        SupportTeamMessage: 'فريق الدعم متاح للمساعدة على مدار الساعة',
        LiveChat: 'الدردشة المباشرة',
        EmailSupport: 'الدعم عبر البريد الإلكتروني',
        
        CategoryNames: {
          General: 'أسئلة عامة',
          Account: 'الحساب والفواتير',
          Services: 'الخدمات',
          Technical: 'الدعم التقني'
        },
        
        Categories: {
          General: {
            Q1: 'كيف يمكنني إنشاء طلب جديد؟',
            A1: 'لإنشاء طلب جديد، انتقل إلى صفحة الطلبات وانقر على زر "طلب جديد". املأ التفاصيل المطلوبة مثل معلومات العميل والمنتجات والكميات وطريقة الدفع. بمجرد الانتهاء، انقر على "إرسال" لإنشاء الطلب.',
            Q2: 'هل يمكنني تصدير بياناتي من النظام؟',
            A2: 'نعم، يمكن تصدير معظم البيانات في النظام. انتقل إلى الصفحة المحددة (مثل المنتجات أو الطلبات) وابحث عن زر "تصدير". يمكنك تصدير البيانات بتنسيقات مختلفة مثل Excel أو CSV أو PDF.'
          },
          Account: {
            Q1: 'كيف يمكنني إعادة تعيين كلمة المرور الخاصة بي؟',
            A1: 'يمكنك إعادة تعيين كلمة المرور بالنقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول. أدخل عنوان بريدك الإلكتروني المسجل واتبع التعليمات المرسلة إلى صندوق الوارد الخاص بك.',
            Q2: 'ما هي طرق الدفع التي تقبلونها؟',
            A2: 'نقبل بطاقات الائتمان (فيزا، ماستركارد، أمريكان إكسبرس)، باي بال، والتحويلات البنكية. للاشتراكات المتكررة، نوصي بإعداد المدفوعات التلقائية.'
          },
          Services: {
            Q1: 'هل يمكنني تخصيص لوحة التحكم الخاصة بي؟',
            A1: 'نعم، يمكنك تخصيص لوحة التحكم بالنقر على "تعديل لوحة التحكم" في الزاوية العلوية اليمنى. يمكنك إضافة أو إزالة أو إعادة ترتيب الأدوات وفقًا لتفضيلاتك.',
            Q2: 'ما هو معدل تحديث البيانات؟',
            A2: 'يتم تحديث البيانات في النظام في الوقت الفعلي. ومع ذلك، قد تكون هناك تأخيرات طفيفة في بعض التقارير والتحليلات تصل إلى 15 دقيقة لضمان دقة الحسابات.'
          },
          Technical: {
            Q1: 'كيف يمكنني الاتصال بدعم العملاء؟',
            A1: 'يمكنك الوصول إلى دعم العملاء من خلال قنوات متعددة: الدردشة المباشرة المتاحة على مدار الساعة طوال أيام الأسبوع، أو البريد الإلكتروني على support@example.com، أو الهاتف على 4567-123-800-1+ خلال ساعات العمل (9 صباحًا - 5 مساءً بتوقيت شرق الولايات المتحدة).',
            Q2: 'هل هناك واجهة برمجة تطبيقات (API) متاحة؟',
            A2: 'نعم، نقدم واجهة برمجة تطبيقات شاملة للتكاملات. يمكنك العثور على الوثائق في قسم المطورين تحت الإعدادات. يمكن إنشاء مفاتيح API في إعدادات حسابك.'
          }
        }
      },
      supplier: 'المورّد',
      quantity: 'الكمية',
      total: 'المجموع',
      category: 'الفئة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      lastUpdated: 'آخر تحديث',
      position: 'المنصب',
      startDate: 'تاريخ البدء',
      status: 'الحالة',
      items: 'عناصر'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ['en', 'ar'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    react: {
      useSuspense: false // This is important for immediate language switching
    }
  });

// Initialize direction based on current language
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

export default i18n;