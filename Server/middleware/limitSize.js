
export default function limitSize(err, req, res, next) {
    if (err.type === "entity.too.large") {
        return res.status(413).json({
            message: "Request body is too large",
        });
    }
    next(err);
}