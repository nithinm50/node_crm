exports.getDashboard = (req, res, next) => {
    res.render('module/dashboard/index', {
        title: 'Clevertize CRM | Dashboard',
        page: 'home',
        setup: false,
        user: req.user
    })
}