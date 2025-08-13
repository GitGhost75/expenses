package de.expenses.annotation;

import de.expenses.common.UserConstants;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;

@Component
public class CurrentUserArgumentResolver extends AbstractRequestAttributeArgumentResolver {

    @Override
    protected Class<? extends Annotation> getAnnotationClass() {
        return CurrentUser.class;
    }

    @Override
    protected String getAttributeName() {
        return UserConstants.USER_COOKIE;
    }
}
