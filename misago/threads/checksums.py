from misago.markup import checksums


def is_post_valid(post):
    valid_checksum = make_post_checksum(post)
    return post.post_checksum == valid_checksum


def update_post_checksum(post):
    post_seeds = [unicode(v) for v in (post.id, post.poster_ip)]
    return checksums.make_checksum(post.post_parsed, post_seeds)