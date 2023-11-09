export default function Authentication(){
    function authenticateUser(req, res, next) {
        if (req.session.user) {
            next(); 
        } else {
            res.redirect('/login');
        }
    }
    
    function checkAdmin(req, res, next) {
        if (req.session.user && req.session.user.is_admin) {
            next();
        } else {
            res.redirect('/');
        }
    }

    return{
        authenticateUser,
        checkAdmin
    }
}